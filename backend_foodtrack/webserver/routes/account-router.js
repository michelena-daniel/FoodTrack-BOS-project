'use strict';

const express = require('express');
const createAccount = require('../controllers/account/create-account');
const activateAccount = require('../controllers/account/activate-account');
const login = require('../controllers/account/login');

const accountRouter = express.Router();

// metodos relacionados con account crear el verifyCode
accountRouter.post('/account', createAccount);

// activationCode buscar el account en mongo y añadirle el campo verifyAt con la fecha
accountRouter.get('/account/activate', activateAccount);

//
accountRouter.post('/account/login', login);


module.exports = accountRouter;