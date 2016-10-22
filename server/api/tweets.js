"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();

module.exports = function(db) {

  tweets.get("/", function(req, res) {
    console.log("getting tweets")

    db.getTweets((tweets) => {

      console.log("returning tweets")
    // simulate delay
    //setTimeout(() => {
      return res.json(tweets);
    });
  }); //, 300);


  tweets.post("/", function(req, res) {
    console.log(req.body.text);
    if (!req.body.text) {
      console.log("something went wrong in post");
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    console.log("we have a tweet", tweet.content)
    db.saveTweet(tweet);

    return res.send();
  });

  return tweets;

};
