import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../config/key.js";
import { userModel } from "../models/User.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      userModel
        .findOne({
          googleId: profile.id,
        })
        .then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new userModel({
              googleId: profile.id,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
    }
  )
);
