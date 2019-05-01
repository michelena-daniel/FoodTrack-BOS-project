'use strict';
const mongoose = require('mongoose');

// create the schema

const { Schema } = mongoose; // same as const 'Schema = mongoose.Schema' without destructuring

const trackingPostSchema = new Schema({
    uuid: {
        type: String,
        unique: true,
      },
    post: [{
        foodUuid: String,
        pictureUrl: String,
        foodName: String,
        description: String,
        calories: Number,
        eatenAt: {
            type: Date,
            default: Date.now()
        },
        mealTime: String, //breakfast, lunch, dinner
    }],
  });

  //convert the schema to a model
const trackingPost = mongoose.model('trackingPost', trackingPostSchema);

module.exports = trackingPost;