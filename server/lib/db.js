"use strict"

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";


let db;

const dbMethods = {

  saveTweet: (data) => {
    MongoClient.connect(MONGODB_URI, (err, mongoInstance) => {

      if (err) {
        console.log('Could not connect! Unexpected error. Details below.');
        throw err;
      }

    db = mongoInstance;

    let collection = db.collection("tweets");
    //db.tweets.push(data);
    collection.insertOne(data);
    console.log(data);
      return true; //).toArray((err, res) => {
    });
  },

  getTweets: (cb) => {
    MongoClient.connect(MONGODB_URI, (err, mongoInstance) => {

      if (err) {
        console.log('Could not connect! Unexpected error. Details below.');
        throw err;
      }

      db = mongoInstance;

      let collection = db.collection("tweets");
      collection.find().toArray(function(err, results) {
        results.sort(function(a, b) { return a.created_at < b.created_at });
        cb(results);
      });
    });
  }
}

module.exports = {
  connect: (onConnect) => {
  onConnect(dbMethods);

  }
}

