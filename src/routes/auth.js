const express = require('express');
const router = express.Router();
const passport = require('passport');
const { UserRepository } = require('../repositories/user.repositorie');
const { UserDao } = require('../Dao/factory'); 
const UserModel= new  UserRepository(UserDao);
const configurePassport = require('../config/passport.config');
const bcrypt = require('bcrypt');
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    console.log(email)
    const usuario = await UserModel.getUserByEmail( email );
    if (!usuario) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas',
      });
    }
    console.log(usuario,password)
    const esContraseñaCorrecta = await bcrypt.compare(password, usuario.password);

    if (esContraseñaCorrecta) {
      const { _id, username } = usuario

      res.cookie('userData', { _id, username, email, }, { httpOnly: true });
      return res.status(200).json({
        status: 'success',
        payload: usuario,
        message: 'Inicio de sesión correcto',
      });
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/auth/github/callback', (req, res, next) => {
  passport.authenticate('github', async (err, usuario) => {
    try {
      if (err) {
        return res.redirect('/login');
      }

      if (!usuario) {
        return res.redirect('/login');
      }

      const { _id, username, email } = usuario;

      res.cookie('userData', { _id, username, email }, { httpOnly: true });

      return res.redirect('/');
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});
  

module.exports = router; 

