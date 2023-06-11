const movies = require('../models/movies');
const BadRequestError = require('../utils/errors/BadRequestError');
const PermissionError = require('../utils/errors/PermissionError');
const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  movies
    .find({ owner: req.user._id })
    .then((allMovies) => res.send(allMovies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  movies
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
      owner: req.user._id,
    })
    .then((newMovie) => res.send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid input data'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  movies
    .findById(req.params.movieId)
    .orFail(() => next(new NotFoundError('Movie with this id was not found')))
    .then((movieToDelete) => {
      if (req.user._id === movieToDelete.owner.toString()) {
        movies
          .findByIdAndRemove(req.params.movieId)
          .then(() => {
            res.send({ message: 'Film removed' });
          })
          .catch(next);
      } else {
        next(new PermissionError('Unable to delete another users movie'));
      }
    })
    .catch(next);
};
