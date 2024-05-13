import express from "express";
import "./services/passport.js";
import { routes } from "./routes/authRoutes.js";
import mongoose from "mongoose";
import { cookieKey, mongoURL } from "./config/key.js";
import "./models/User.js";
import cookieSession from "cookie-session";
import passport from "passport";

const app = express();
mongoose.connect(mongoURL).then(() => console.log("Connected with Mongo Db"));

app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

routes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
