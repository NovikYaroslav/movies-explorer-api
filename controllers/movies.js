const movies = require('../models/movies');
const BadRequestError = require('../utils/errors/BadRequestError');
// const PermissionError = require('../utils/errors/PermissionError');
// const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  movies
    .find({})
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
        console.log(err.message);
        next(
          new BadRequestError(
            'Переданы некорректные данные в методы создания фильма',
          ),
        );
      } else {
        next(err);
      }
    });
};

// module.exports.deleteCard = (req, res, next) => {
//   card
//     .findById(req.params.cardId)
//     .orFail(() => next(new NotFoundError('Карточка с таким id не найдена')))
//     .then((cardToDelete) => {
//       if (req.user._id === cardToDelete.owner.toString()) {
//         card.findByIdAndRemove(req.params.cardId).then(() => {
//           res.send({ message: 'Карточка удалена' });
//         });
//       } else {
//         next(
//           new PermissionError(
//             'Невозможно удалить карточку другого пользователя'
//           )
//         );
//       }
//     })
//     .catch(next);
// };

// module.exports.likeCard = (req, res, next) => {
//   card
//     .findByIdAndUpdate(
//       req.params.cardId,
//       { $addToSet: { likes: req.user._id } },
//       { new: true }
//     )
//     .orFail(() => next(new NotFoundError('Карточка с таким id не найдена')))
//     .then((targetCard) => res.send(targetCard))
//     .catch(next);
// };

// module.exports.dislikeCard = (req, res, next) => {
//   card
//     .findByIdAndUpdate(
//       req.params.cardId,
//       { $pull: { likes: req.user._id } },
//       { new: true }
//     )
//     .orFail(() => next(new NotFoundError('Карточка с таким id не найдена')))
//     .then((targetCard) => res.send(targetCard))
//     .catch(next);
// };
