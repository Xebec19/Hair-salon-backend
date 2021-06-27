import pkg from 'passport-jwt'
import User from '../models/User'
import * as de from 'dotenv'
import passport from 'passport';
const { Strategy, ExtractJwt } = pkg;
const dotenv = de.config();

/*var opts:passport = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
passport.use(new Strategy(opts, (jwt_payload, done) => {
    User.findById({ id: jwt_payload.payload.id }).then((user:any) => {
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    })
        .catch((err:any) => console.log(err));
}))*/

passport.use(new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    }, function (jwtToken, done) {
      User.findOne({ email: jwtToken.payload.email }, function (err:any, user:any) {
        if (err) { console.log(err);return done(err, false); }
        if (user) {
          return done(undefined, user , jwtToken);
          console.log('--sucess authorization succeeded');
        } else {
          return done(undefined, false);
          console.log('--failure authorization failed')
        }
      });
    }));
  