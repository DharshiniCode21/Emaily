import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleClientID, googleClientSecret } from "../config/key.js";
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
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
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
