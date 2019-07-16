$(document).ready(function() {
  console.log("char counter ready");

  const mytextarea = $('.textbox');
  $('.counter').html('140');

  mytextarea.on('keyup', () => {
    let boxlength = mytextarea.val().length;
    const max = 140;
    $('.counter').html(`${max - boxlength}`);
    if (max - boxlength < 0) {
      $('.counter').css("color","red");
    }
    if(max - boxlength >= 0) {
      $('.counter').css("color", "black");
    }
  });




});