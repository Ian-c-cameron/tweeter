
/**
 * maintain the count of characters in the textArea
 * As per the assignment this is in it's own file
 */
$(document).ready(function() {
  $('#tweet-text').keyup(function() {
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
