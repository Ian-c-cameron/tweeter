/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*********************************************************************
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
 * excape - sanitizes strings to prevent XSS attacks
 * @param {*} str string to be made safe for display in HTML
 */
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * createTweetElement - takes a tweet object, and translates it to HTML
 * @param {*} tweet a tweet data object to be formatted for display
 */
const createTweetElement = function(tweet) {
  let output = `<br>`;
  //below is an experiment in building HTML in a readable way
  output += `<article class='tweet'>`;
  output += `  <header>`;
  output += `    <div>`;
  output += `      <div>`;
  output += `        <img src='${tweet.user.avatars}'>`;
  output += `      </div>`;
  output += `      <h4>${escape(tweet.user.name)}</h4>`;
  output += `    </div>`;
  output += `    <h4>${escape(tweet.user.handle)}</h4>`;
  output += `  </header>`;
  output += `  <p>${escape(tweet.content.text)}</p>`;
  output += `  <footer>`;
  output += `    <span>${getAge(tweet.createdAt)}</span>`;
  output += `    <div>share/like buttons</div>`;
  output += `  </footer>`;
  output += `</article>`;
  const $tweet = $(output);
  return $tweet;
};

/**
 * renderTweets - renders tweet data into HTML cards for display
 * @param {*} tweets preprocessed tweet data
 * @param {*} $container where to render the tweet cards
 */
const renderTweets = function(tweets, $container) {
  const keys = Object.keys(tweets);
  for (let i = keys.length - 1; i >= 0; i--) {
    const tweet = keys[i];
    const $tweet = createTweetElement(tweets[tweet]);
    $container.append($tweet);
  }
};

/**
 * loadTweets - fetches tweet data, passes them to a callback
 * @param {*} callback a function to send the retrieved data
 */
const loadTweets = function(callback) {
  $.ajax('/tweets/', { method: 'GET', dataType: 'JSON'})
    .then(res => callback(res));
};

/**
 * Clears the loaded tweets, and reloads them from the server
 * @param {*} $container a DOM element to put tweets into
 */
const refreshTweets = function($container) {
  $(document).ready(function() {
    $($container).empty();
    loadTweets(data => renderTweets(data, $container));
  });
};

/*****************************************************************
 * Main Code Execution:
 * -render dynamically generated elements
 * -create listeners
 */
$(document).ready(function() {
  /**
   * Initial Render of tweets
   */
  loadTweets(data => renderTweets(data, $('#tweets-container')));

  /**
  * Listeners:
  * Hover over tweet cards
  */
  $('#tweets-container').on('mouseenter', '.tweet', function() {
    $(this).css('box-shadow', '6px 6px 9px #1d284b');
    $(this).css('font-weight', 'bold');
    let handle = $(this).children().first().children().last();
    handle.css('display', 'inline');
  });
  $('#tweets-container').on('mouseleave', '.tweet', function() {
    $(this).css('box-shadow', 'none');
    $(this).css('font-weight', 'normal');
    let handle = $(this).children().first().children().last();
    handle.css('display', 'none');
  });
  /**
   * Hover over newTweet buttons
   */
  $('button.newTweet').hover(function() {
    $(this).css('box-shadow', '4px 4px 6px #1d284b');
  }, function() {
    $(this).css('box-shadow', 'none');
  });
  /**
   * Click to open tweet submission form
   */
  $('button.newTweet').click(function() {
    $('section.new-tweet').slideToggle();
    $(document).ready(function() {
      if (!$('section.new-tweet').is('visible')) {
        $('#tweet-text').focus();
      }
    });
    
  });
  /**
   * Tweet Submission
   */
  $('.new-tweet > form').submit(event => {
    event.preventDefault();
    let $input = $('#tweet-text');
    const $error = $('.new-tweet > .error');
    if ($input.val().length < 1) {
      $error.text('! Please enter some text. !');
      $error.slideDown();
      return;
    }
    if ($input.val().length > 140) {
      $error.text('! Tweets must be under 140 characters. !');
      $error.slideDown();
      return;
    }
    if ($($error).is(':visible')) {
      $error.slideUp();
    }
    let $counter = $input.next().children().last();
    const out = $input.serialize();
    $input.val('');
    $counter.val(140);
    $.ajax('/tweets/', { method: 'POST', data: out })
      .then(() => refreshTweets($('#tweets-container')))
      .catch(() => console.log('tweet fail'));
  });
  /**
   * hover over goToTop button
   */
  $('#goToTop').hover(function() {
    $('#goToTop').css('box-shadow', '4px 4px 6px #1d284b');
  }, function() {
    $('#goToTop').css('box-shadow', 'none');
  });
  /**
   * scroll to top when goToTop button clicked
   */
  $('#goToTop').click(function() {
    $(window).scrollTop(0);
  });
  /**
   * when scrolled down show goToTop button
   */
  $(window).on('scroll', function() {
    if ($(this).scrollTop()) {
      $('#goToTop').css('display', 'inline');
    } else {
      $('#goToTop').css('display', 'none');
    }
  });
});

