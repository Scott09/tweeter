/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('.error').hide();
  $('.new-tweet').hide();
  

  const createTweetElement = (data) => {
    const $innertext = $('<div>').text(data.content.text).html();
    let myHtml = `
    <div class="newtweet classWithShadow">
      
      <p class="tweetcontent"><img class ="tweeticon" src="${data.user.avatars}" alt="okay">${data.user.name}<span class="spanright">${data.user.handle}</span></p>
      <p class="tweetcontent">${$innertext}</p>
      <hr class="row" />
    
      <p class="tweetcontent date">${moment(new Date(data.created_at)).fromNow()}<i class="far fa-thumbs-up"><i class="fas fa-retweet"></i></i><i class="fas fa-flag"></i></p>
    </div>
    `;

    const tweet = $("<article>").addClass("tweet");
    tweet.html(myHtml);
    return tweet;
  };
  

  const renderTweets = (data) => {
    $("#tweets-container").empty();
    for (const item of data) {
      $("#tweets-container").append(createTweetElement(item));
    }
  }

    const newtweet = $('.newtweet');
    const $form = $('.tweetform');


    newtweet.on('hover', () => {
      newtweet.toggleClass('classWithShadow');
    });

    const inputNotValid = (element) => {
      const charNumber = element.val().length;
      return (charNumber > 140 || charNumber === 0);
    }

    $form.on('submit', (event) => {
      event.preventDefault();
      const $form = $('.textbox');
      if (inputNotValid($form)) {
        $('.error').show();
      } else {
        $.ajax({
          type: 'POST',
          url: "/tweets",
          data: $form.serialize(),
          success: () => {
            $('.error').hide();
            loadtweets();
            $('.textbox').val('');
          }
        })
      }
    })


    function loadtweets() {
      $.getJSON('/tweets')
          .done((tweets) => {
              renderTweets(tweets)
          })
  }

  $('.navtitleright').on('click', () => {
    $('.new-tweet').fadeToggle(1000);
    $('.textbox').focus();

  });

  loadtweets();
});



