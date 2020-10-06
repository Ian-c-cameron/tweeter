/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  $("article").hover(function() {
    $(this).css("box-shadow", "6px 6px 9px #1d284b");
    $(this).css("font-weight", "bold");
    let handle = $(this).children().first().children().last();
    handle.css("display", "inline");
  }, function() {
    $(this).css("box-shadow", "none");
    $(this).css("font-weight", "normal");
    let handle = $(this).children().first().children().last();
    handle.css("display", "none");
  });
});
