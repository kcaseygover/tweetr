$(document).ready(function()  {
// Test / driver code (temporary). Eventually will get this from the server.

  function createTweetElement(obj) {
    var $tweetdata =
    `<article>
    <header>
    <img class="avatar" src=${obj.user.avatars.small}>
    <h2>${obj.user.name}</h2>
    <h5>${obj.user.handle}</h5>
    </header>
    <main>
    <h3>${escape(obj.content.text)}</h3>
    </main>
    <footer>
    <h6>${obj.created_at}</h6>
    </footer>
    </article>`

    return $tweetdata;
  }

  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
       var $tweet = createTweetElement(tweet)
      $('.tweet-feed').append($tweet);
    });
  }

  $("#tweet").submit(function( event ) {
    event.preventDefault();
    var $calChar = ($(this).find('textarea').val());
    if (($calChar === "") || ($calChar === null) || ($calChar === undefined) || ($calChar === 0)) {
      $('#status').empty().append("Your tweet is not present.");
    }
    if ($calChar.length > 140) {
      $('#status').empty().append("Your tweet is too long!");
    } else {

      $.ajax({
        method: 'POST',
        url: `/tweets/`,
        data: $('#tweet').serialize(),
        success: (response) => {
          $('.tweet-feed').empty();
          loadTweets(tweet);
          this.reset();
        }
      });
    }
  });

  $("#compose").click(function() {
    $('.new-tweet').slideToggle("slow", function() {
      $('textarea').focus()
    });
  });

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url:`/tweets/`,
      success: (response) => {
        renderTweets(response);
      },
    });

  };

  loadTweets();


});

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}





/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

