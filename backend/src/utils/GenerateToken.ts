import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateToken = (id: mongoose.Types.ObjectId) => {
  const sercretKey = process.env.JWT_SECRET_KEY || "ASdfasdfasdfasdf";
  return jwt.sign({ id }, sercretKey, {
    expiresIn: "1d",
  });
};
