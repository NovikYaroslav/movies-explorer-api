const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX, NAME_EN_REGEX, NAME_RU_REGEX } = require('../utils/const');

const {
  getMovies,
  createMovie,
  // deleteCard,
  // likeCard,
  // dislikeCard,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(URL_REGEX).messages({
        'string.pattern.base': 'Введите корректный url постера',
      }),
      trailerLink: Joi.string().required().pattern(URL_REGEX).messages({
        'string.pattern.base': 'Введите корректный url трейлера',
      }),
      thumbnail: Joi.string().required().pattern(URL_REGEX).messages({
        'string.pattern.base': 'Введите корректный url превью',
      }),
      nameRU: Joi.string().required().pattern(NAME_RU_REGEX).messages({
        'string.pattern.base': 'Введите корректное название на русском языке',
      }),
      nameEN: Joi.string().required().pattern(NAME_EN_REGEX).messages({
        'string.pattern.base':
          'Введите корректное название на английском языке',
      }),
      movieId: Joi.string().required(),
    }),
  }),
  createMovie,
);
// router.delete(
//   '/:cardId',
//   celebrate({
//     params: Joi.object().keys({
//       cardId: Joi.string().required().hex().length(24),
//     }),
//   }),
//   deleteCard
// );
// router.put(
//   '/:cardId/likes',
//   celebrate({
//     params: Joi.object().keys({
//       cardId: Joi.string().required().hex().length(24),
//     }),
//   }),
//   likeCard
// );
// router.delete(
//   '/:cardId/likes',
//   celebrate({
//     params: Joi.object().keys({
//       cardId: Joi.string().required().hex().length(24),
//     }),
//   }),
//   dislikeCard
// );

module.exports = router;
