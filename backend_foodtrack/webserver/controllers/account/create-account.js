'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const sendgridMail = require('@sendgrid/mail');
const uuidV4 = require('uuid/v4');
const AccountModel = require('../../../models/account-model');
const UserModel = require('../../../models/user-model');
const trackingPostModel = require('../../../models/tracking-post');

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

async function insertAccountIntoDatabase(email, password) {
  const securePassword = await bcrypt.hash(password, 10);
  const uuid = uuidV4();  
  const now = new Date();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
  const verificationCode = uuidV4();

  const data = {
    uuid,
    email,
    password: securePassword,
    createdAt,
    verification: {
      verificationCode,
      verifiedAt: null,
    }
  };
    
    await AccountModel.create(data);    
    return {
      uuid,
      verificationCode,
    };

  }



async function validate(payload) {
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    };
  
    return Joi.validate(payload, schema);
  }

  async function createUserProfile(uuid) {
    const userProfileData = {
      uuid,
      avatarUrl: null,
      fullName: null,
      friends: [],
      preferences: {
        isPublicProfile: false,
        linkedIn: null,
        twitter: null,
        instagram: null,
        description: null,
      },
    };
  
    try {
      await UserModel.create(userProfileData);
    } catch (e) {
      throw err;
    }
  }

  async function sendEmailRegistration(userEmail, verificationCode) {
    const msg = {
      to: userEmail,
      from: {
        email: 'foodtrack@yopmail.com',
        name: 'FoodTrack Services',
      },
      subject: 'Welcome to FoodTrack! :)',
      text: 'Start eating healthy and maintaining an extensive record of what you eat.',
      html: `To confirm the account <a href="${process.env.HTTP_SERVER_DOMAIN}/api/account/activate?verification_code=${verificationCode}">activate it here</a>`,
    };
  
    const data = await sendgridMail.send(msg);
  
    return data;
  }

  async function initializeFoodPost(uuid) { 

    const data = {
      uuid,
      post: [],
    };
  
    await trackingPostModel.create(data);
  }

  async function createAccount(req, res, next) {
    const accountData = { ...req.body };
    // Validate user data or send 400 bad request err

    try {
      await validate(accountData);

    } catch (e) {
      // Create validation error
      return res.status(400).send(e);
    }
  
    const {
      email,
      password,
    } = accountData;
  
    try {
      // Create the account and send the OK response
      const { uuid, verificationCode } = await insertAccountIntoDatabase(email, password);

      

      /**
       * We are going to create a minimum structure in mongodb
       */

      await createUserProfile(uuid);
            
      await initializeFoodPost(uuid);
  
      // Generate verification code and send email
       
      try {
        await sendEmailRegistration(email, verificationCode);
        res.status(204).json(); 
      } catch (err) {
        console.error('Sengrid error', err.message);
        res.status(500).send();
      }
    } catch (e) {
      // create error
      res.status(409).send("Wrong account register, e-mail might already exist.");      
    }
  }

  module.exports = createAccount;