import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateToken = (id: mongoose.Types.ObjectId) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error(
      "JWT_SECRET_KEY is not defined in the environment variables"
    );
  }
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};
