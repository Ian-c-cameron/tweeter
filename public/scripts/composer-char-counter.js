
/**
 * maintain the count of characters in the textArea
 * As per the assignment this is in it's own file
 */
$(document).ready(function() {
  $('#tweet-text').keyup(function(e) {
    const code = (e.keyCode ? e.keyCode : e.which);//care of Rohan Kumar https://stackoverflow.com/questions/19804378/jquery-to-submit-textarea-with-enter-key
    if (code === 13) {
      //need to remove the return from the end of the input
      //to fix return on empty box as valid input
      let value = $('#tweet-text').val();
      value = value.split('');
      value.pop();
      $('#tweet-text').val(value.join(''));
      $(".new-tweet button").trigger('click');
      return true;
    }
    let $counter = $(this).next().children().last();
    let value = 140 - this.value.length;
    if (value < 0) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', '#545149');
    }
    $counter.val(value);
  });
});
