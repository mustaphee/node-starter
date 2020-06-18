const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { USER_STATUS, DEFAULT_PROFILE_IMG } = require('../utils/constants');
const { SALT_ROUNDS } = require('../config');

const BaseUserModelSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'Please provide your first name'],
    maxlength: 120,
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, 'Please provide your last name'],
    maxlength: 120,
    trim: true,
  },
  email: {
    type: String,
    maxlength: 45,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone_number: {
    type: String,
    maxlength: 15,
    required: [true, 'Please enter your phone number'],
    unique: true,
    // regex this later
    // validate: () {}
  },
  gender: {
    type: String,
    maxlength: 10,
    required: true,
  },
  address: {
    type: String,
    maxlength: 255,
    required: true,
  },
  status: {
    type: String,
    enum: USER_STATUS,
  },
  profile_img: {
    type: String,
    maxlength: 200,
    required: true,
    default: DEFAULT_PROFILE_IMG,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

// eslint-disable-next-line func-names
BaseUserModelSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
  return next();
});

module.exports = {
  BaseUserModelSchema, // So schema can be reused in multi db setup
  User: model('user', BaseUserModelSchema),
};
