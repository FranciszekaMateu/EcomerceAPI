const express = require('express');
const router = express.Router();
const passport = require('passport');
const { UserRepository } = require('../repositories/user.repositorie');
const { UserDao } = require('../Dao/factory');
const UserModel = new UserRepository(UserDao);
const configurePassport = require('../config/passport.config');
const bcrypt = require('bcrypt');

configurePassport(passport);

router.post(
  '/login',
  passport.authenticate('local'),
  async (req, res, next) => {
    try {
      res.status(200).json({
        status: 'success',
        message: 'Inicio de sesión correcto',
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { session: false }),
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.redirect('/login');
      }

      const { _id, username, email } = req.user;

      res.cookie('userData', { _id, username, email }, { httpOnly: true });

      return res.redirect('/');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;


