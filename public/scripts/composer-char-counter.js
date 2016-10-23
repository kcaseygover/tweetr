$(document).ready(function()  {
  $('textarea').keyup(function() {
    var value = $(this).val().length;
    var charactersLeft = 140 - value;
    var counter = $(this).parent().find('.counter');
    counter.text(charactersLeft);
    if(charactersLeft < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });
});



