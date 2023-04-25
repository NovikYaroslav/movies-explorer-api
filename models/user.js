const mongoose = require('mongoose');
const validator = require('validator');
// const { URL_REGEX } = require('../utils/const');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(isCorrect) {
          return validator.isEmail(isCorrect);
        },
        message: 'Поле "email" должно быть валидным email-адресом',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 2,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
