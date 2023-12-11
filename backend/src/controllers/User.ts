import "express-async-errors";
import bcrypt from "bcrypt";
import { Response } from "express";
import { validateUser, validateUpdateUserById } from "../validation/User";
import { User } from "../models/User";
import mongoose from "mongoose";
import { CustomRequest } from "../types/Types";
import {
  registerNewUser,
  findAllUsers,
  findUserById,
  findUserProfileById,
  findAndUpdateUserProfileById,
  findAndUpdateUserById,
  findAndDeleteUserById,
  userLogin,
} from "../services/User";
import { userDto } from "../dto/User";

export const signup = async (req: CustomRequest, res: Response) => {
  const userData: userDto = req.body;
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const regiesteredUser = await registerNewUser(userData, res);
  res.status(200).json(regiesteredUser);
};

export const getAllUser = async (req: CustomRequest, res: Response) => {
  const users = await findAllUsers();
  res.status(200).send(users);
};

export const getUserById = async (req: CustomRequest, res: Response) => {
  const userId = req.params.id;
  const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidUserId) {
    res.status(400);
    throw new Error("Invalid user id");
  }
  const user = await findUserById(userId);
  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }
  res.send(user);
};

export const getUserProfile = async (req: CustomRequest, res: Response) => {
  const userId = req.user._id;
  const userProfile = await findUserProfileById(userId, res);
  res.status(200).json(userProfile);
};

export const updateUserProfile = async (req: CustomRequest, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Empty request body.");
  }
  const userId = req.user._id;
  const { fullName, username, password } = req.body;
  const updatedUserProfile = await findAndUpdateUserProfileById(
    userId,
    { fullName, username, password },
    res
  );

  res.status(200).json({
    _id: updatedUserProfile?._id,
    fullName: updatedUserProfile?.fullName,
    username: updatedUserProfile?.username,
    isAdmin: updatedUserProfile?.isAdmin,
  });
};

export const updateUserById = async (req: CustomRequest, res: Response) => {
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

  const { fullName, username, isAdmin, password } = req.body;
  const updatedUser = await findAndUpdateUserById(
    userId,
    {
      fullName,
      username,
      isAdmin,
      password,
    },
    res
  );
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

export const deletUserById = async (req: CustomRequest, res: Response) => {
  const userId = req.params.id;
  const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidUserId) {
    res.status(400);
    throw new Error("Invalid user id");
  }

  const userDeletec = await findAndDeleteUserById(userId, res);

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    await user.deleteOne();
    res.status(200).json({ message: "user deleted successfully" });
  }
};

export const login = async (req: CustomRequest, res: Response) => {
  const { username, password } = req.body;
  await userLogin(username, password, res);
};
