import { User } from "../models/User";
import { userDto } from "../dto/User";
import { Document } from "mongoose";

export const getUserByUserName = async (
  username: string
): Promise<userDto | null> => {
  const user = await User.findOne({ username: username });
  return user;
};

export const saveUser = async (userData: userDto) => {
  const newUser = new User(userData);
  const newSavedUser = await newUser.save();
  return newSavedUser;
};

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const saveUserAfterUpdating = async (userId: any, user: any) => {
  return await User.findByIdAndUpdate(userId, user, {
    new: true,
    runValidators: true,
  });
};

export const deleteUserById = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
};

export const getUserByCredentials = async (username: string) => {
  return await User.findOne({ username });
};
