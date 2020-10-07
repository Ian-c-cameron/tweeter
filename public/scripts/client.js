/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*************
 * FUNCTIONS
 */
/**
 * getAge - takes a timestamp, and produces a readable age
 * @param {*} timestamp a previous time
 */
const getAge = function(timestamp) {
  //baseDiff is in milliseconds
  const baseDiff = Date.now() - timestamp;

  //diff is in seconds if less than a minute
  if (baseDiff < 60000) {
    let diff = Math.floor(baseDiff / 1000);
    return `${diff} seconds ago`;
  }
  //diff is in minutes if less than an hour
  if (baseDiff < 3600000) {
    let diff = Math.floor(baseDiff / 60000);
    return `${diff} minutes ago`;
  }
  //diff is in hours if less than a day
  if (baseDiff < 86400000) {
    let diff = Math.floor(baseDiff / 3600000);
    return `${diff} hours ago`;
  }
  //diff is in days if less than a week
  if (baseDiff < 604800000) {
    let diff = Math.floor(baseDiff / 86400000);
    return `${diff} days ago`;
  }
  //return in weeks(anything more than a few weeks old is ancient anyway)
  let diff = Math.floor(baseDiff / 604800000);
  return `${diff} weeks ago`;
};

/**
 * createTweetElement - takes a tweet object, and translates it to HTML
 * @param {*} tweet a tweet data object to be formatted for display
 */
const createTweetElement = function(tweet) {
  let output = `<br>`;
  //below is an experiment in building HTML in a readable way
  output += `<article>`;
  output += `  <header>`;
  output += `    <div>`;
  output += `      <div>`;
  output += `        <img src="${tweet.user.avatars}">`;
  output += `      </div>`;
  output += `      <h4>${tweet.user.name}</h4>`;
  output += `    </div>`;
  output += `    <h4>${tweet.user.handle}</h4>`;
  output += `  </header>`;
  output += `  <section>${tweet.content.text}</section>`;
  output += `  <footer>`;
  output += `    <span>${getAge(tweet.createdAt)}</span>`;
  output += `    <div>share/like buttons</div>`;
  output += `  </footer>`;
  output += `</article>`;
  const $tweet = $(output);
  return $tweet;
};

const renderTweets = function(tweets, $container) {
  for (const tweet in tweets) {
    const $tweet = createTweetElement(tweets[tweet]);
    $container.append($tweet);
  }
};
const loadTweets = function(callback) {
  $.ajax('/tweets/', { method: 'GET', dataType: 'JSON'})
    .then(res => callback(res));
};

const refreshTweets = function($container) {
  $(document).ready(function() {
    $($container).empty();
    loadTweets(data => renderTweets(data, $container));
  });
};

/***************************
 * Main Code Execution:
 * -render dynamically generated elements
 * -create listeners
 */
$(document).ready(function() {
  /**
   * Render Dynamic Content
   */
  loadTweets(data => renderTweets(data, $('#tweets-container')));
  //renderTweets(data, $('#tweets-container'));
  /**
  * Listeners:
  * Hover over tweet cards
  */
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
  /**
   * Tweet Submission Listener
   */
  $('.new-tweet > form').submit(event => {
    event.preventDefault();
    let $input = $('#tweet-text');
    if ($input.val().length < 1) {
      alert("Please enter some text.");
      return;
    }
    if ($input.val().length > 140) {
      alert("You can only post 140 characters at a time.");
      return;
    }
    let $counter = $input.next().children().last();
    const out = $input.serialize();
    $input.val('');
    $counter.val(140);
    $.ajax('/tweets/', { method: 'POST', data: out })
      .then(refreshTweets($('#tweets-container')))
      .catch(console.log('tweet fail'));
  });
});

