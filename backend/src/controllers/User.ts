import "express-async-errors";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validateUser, validateUpdateUserById } from "../validation/User";
import { User } from "../models/User";
import mongoose from "mongoose";
import { generateToken } from "../utils/GenerateToken";

export const userSignup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const userExists = await User.findOne({ username: username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let user = new User({
    fullName: req.body.fullname,
    username: req.body.username,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
  });
  user = await user.save();
  const token = generateToken(user._id);
  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    isAdmin: user.isAdmin,
    toke: token,
  });
};

export const getAllUser = async (req: Request, res: Response) => {
  const users = await User.find();
  if (!users.length) {
    res.status(400).send("No user found");
  }
  res.status(200).send(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidUserId) {
    res.status(400);
    throw new Error("Invalid user id");
  }
  const user = await User.findById(userId).select({
    password: 0,
    _id: 0,
    __v: 0,
  });
  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }
  res.send(user);
};

export const updateUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidUserId) {
    res.status(400);
    throw new Error("Invalid user id");
  }

  const { error } = validateUpdateUserById(req.body);
  if (error) {
    res.status(400);
    throw new Error(`${error.details[0].message}`);
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  } else {
    user.fullName = req.body.fullName || user.fullName;
    user.username = req.body.username || user.username;
    user.password = req.body.password || user.password;
    user.isAdmin = req.body.isAdmin;
    const updateUser = await user.save();
    res.json(updateUser);
  }
};

export const deletUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidUserId) {
    res.status(400);
    throw new Error("Invalid user id");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    await user.deleteOne();
    res.status(200).json({ message: "user deleted successfully" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      isAdmin: user.isAdmin,
      toke: token,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
