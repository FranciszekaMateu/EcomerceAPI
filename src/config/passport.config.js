const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const { UserModel } = require('../Dao/mongo/models/userModel');
const { gitHubClientId, gitHubClientSecret } = require('./config');

const configurePassport = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Usuario o contraseña incorrectos' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Usuario o contraseña incorrectos' });
      }

      return done(null, user);
    })
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: gitHubClientId,
        clientSecret: gitHubClientSecret,
        callbackURL: '/auth/github/callback',
        scope: ['user:email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        let user = await UserModel.findOne({ githubId: profile.id });

        if (!user) {
          user = await UserModel.create({
            githubId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
          });
        }

        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
  });
};

module.exports = configurePassport;
