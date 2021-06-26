import pkg from 'passport-jwt'
import User from './../models/User'
import * as de from 'dotenv'
import passport from 'passport';
const {Strategy,ExtractJwt} = pkg;
const dotenv = de.config();

var opts:passport={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
passport.use(new Strategy(opts,(jwt_payload,done) => {
    User.findById({id:jwt_payload.payload.id},)
}))
