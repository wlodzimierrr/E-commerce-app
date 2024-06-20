require('dotenv').config();
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local')
const AuthService = require('../services/authService');
const AuthServiceInstance = new AuthService();
const UserModel = require('../models/userModel');
const UserModelInstance = new UserModel();


module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser((user, done) => {
      console.log('Serializing user:', user);
      done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
      console.log('Deserializing user by ID:', id);
      done(null, { id });
  });

    passport.use(new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
      try {
        const user = await UserModelInstance.findOneById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.error('Error during user verification in JWT strategy:', err);
        return done(err, false);
      }
    }));

    passport.use(new LocalStrategy(
        async (username, password, done) => {
        try {
            const user = await AuthServiceInstance.login({email: username, password});
            
            return done(null, user.user); 
        } catch(err) {
            return done(err);
        }
    }
    ));

    return passport;
    
}