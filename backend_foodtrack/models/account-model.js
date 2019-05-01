'use strict';
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const mongoose = require('mongoose');

// create the schema

const { Schema } = mongoose; // same as const 'Schema = mongoose.Schema' without destructuring

const accountSchema = new Schema({
    uuid: {
        type: String,
        unique: true,
      },
      email: {
        type: String,
        unique: 'This email is already taken ({VALUE})',
      },
    password: String,
    createdAt: Date, 
    verification: {
      verificationCode: String,
      verifiedAt: Date,
    },
  },
  );

  //convert the schema to a model
  
accountSchema.plugin(beautifyUnique);
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;


