const mongoose = require('mongoose');
const { URL_REGEX, NAME_EN_REGEX, NAME_RU_REGEX } = require('../utils/const');

const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(val) {
          return URL_REGEX.test(val);
        },
        message: 'Поле "image" должно быть валидным url-адресом',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(val) {
          return URL_REGEX.test(val);
        },
        message: 'Поле "trailerLink" должно быть валидным url-адресом',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(val) {
          return URL_REGEX.test(val);
        },
        message: 'Поле "thumbnail" должно быть валидным url-адресом',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    movieId: {
      type: String,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
      validate: {
        validator(val) {
          return NAME_RU_REGEX.test(val);
        },
        message:
          'Поле "nameRU" должно содержать только русские букву и/или цифры',
      },
    },
    nameEN: {
      type: String,
      required: true,
      validate: {
        validator(val) {
          return NAME_EN_REGEX.test(val);
        },
        message:
          'Поле "nameEN" должно содержать только английские букву и/или цифры',
      },
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
