import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  googleId: String,
});

export const userModel = mongoose.model("users", userSchema);
