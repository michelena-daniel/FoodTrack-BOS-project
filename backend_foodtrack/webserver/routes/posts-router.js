'use strict'

const express = require('express');
const JWTtoken = require('../controllers/webToken/check-jwt-token');
const getPost = require('../controllers/posts/get-posts');
const createPost = require('../controllers/posts/create-post');

const postsRouter = express.Router();

postsRouter.get('/getPosts', JWTtoken, getPost);
postsRouter.post('/post', JWTtoken, createPost);

module.exports = postsRouter;