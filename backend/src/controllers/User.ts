import "express-async-errors";
import { Response } from "express";
import {
  validateUser,
  validateUpdateUserById,
  validateUpdateUserProfileById,
} from "../validation/User";
import { User } from "../models/User";
import mongoose from "mongoose";
import { CustomRequest } from "../types/Types";
import { userDto } from "../dto/User";
import { userServiceInstance } from "../Server";

export const signup = async (req: CustomRequest, res: Response) => {
  const userData: userDto = req.body;
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const regiesteredUser = await userServiceInstance.registerNewUser(
    userData,
    res
  );
  res.status(200).json(regiesteredUser);
};

export const getAllUser = async (req: CustomRequest, res: Response) => {
  const users = await userServiceInstance.findAllUsers();
  res.status(200).send(users);
};

export const getUserById = async (req: CustomRequest, res: Response) => {
  const userId = req.params.id;
  const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidUserId) {
    res.status(400);
    throw new Error("Invalid user id");
  }
  const user = await userServiceInstance.findUserById(userId);
  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }
  res.send(user);
};

export const getUserProfile = async (req: CustomRequest, res: Response) => {
  const userId = req.user._id;
  const userProfile = await userServiceInstance.findUserProfileById(
    userId,
    res
  );
  res.status(200).json(userProfile);
};

export const updateUserProfile = async (req: CustomRequest, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Empty request body.");
  }
  const { error } = validateUpdateUserProfileById(req.body);
  if (error) {
    res.status(400);
    throw new Error(`${error.details[0].message}`);
  }
  const userId = req.user._id;
  const { fullName, username, password } = req.body;
  const updatedUserProfile =
    await userServiceInstance.findAndUpdateUserProfileById(
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
  const updatedUser = await userServiceInstance.findAndUpdateUserById(
    userId,
    {
      fullName,
      username,
      isAdmin,
      password,
    },
    res
  );
  res.status(200).json(updatedUser);
};

export const deletUserById = async (req: CustomRequest, res: Response) => {
  const userId = req.params.id;
  const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidUserId) {
    res.status(400);
    throw new Error("Invalid user id");
  }

  const userDeletec = await userServiceInstance.findAndDeleteUserById(
    userId,
    res
  );

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
  await userServiceInstance.userLogin(username, password, res);
};
