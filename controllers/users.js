const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const user = require('../models/user');
const { pickKey } = require('../utils/pickKey');
const BadRequestError = require('../utils/errors/BadRequestError');
const AuthorizationError = require('../utils/errors/AuthorizationError');
const DublicationError = require('../utils/errors/DublicationError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  user
    .findOne({ email })
    .select('+password')
    .orFail(() => next(new AuthorizationError('User not found')))
    .then((userData) => bcrypt.compare(password, userData.password).then((matched) => {
      if (matched) {
        const key = pickKey();
        const jwt = jsonwebtoken.sign({ _id: userData._id }, key, {
          expiresIn: '7d',
        });
        res.send({ jwt });
        return;
      }
      next(new AuthorizationError('Invalid email or password'));
    }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => user.create({
      name,
      email,
      password: hash,
    }))
    .then((newUser) => res.send({
      email: newUser.email,
      name: newUser.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid input data'));
      }
      if (err.code === 11000) {
        next(new DublicationError('User with this email already exists'));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  user
    .findById(req.user._id)
    .then((CurrentUser) => res.send(CurrentUser))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  user
    .findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, email: req.body.email },
      { new: true, runValidators: true },
    )
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid input data'));
      }
      if (err.code === 11000) {
        next(new DublicationError('User with this email already exists'));
      } else {
        next(err);
      }
    });
};
