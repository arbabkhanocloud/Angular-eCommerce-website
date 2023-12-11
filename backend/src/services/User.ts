import { getUserByUserName } from "../repositories/User";
import { Response } from "express";
import bcrypt from "bcrypt";
import { userDto } from "../dto/User";
import {
  saveUser,
  getAllUsers,
  getUserById,
  saveUserAfterUpdating,
  deleteUserById,
  getUserByCredentials,
} from "../repositories/User";
import { generateToken } from "../utils/GenerateToken";

export const registerNewUser = async (userData: userDto, res: Response) => {
  const userExist = await findUserByUserName(userData.username);

  if (userExist) {
    res.status(400);
    throw new Error("User already exist.");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;
  const newUser = await saveUser(userData);
  return {
    _id: newUser._id,
    fullName: newUser.fullName,
    isAdmin: newUser.isAdmin,
    token: generateToken(newUser._id),
  };
};

export const findAllUsers = async () => {
  return await getAllUsers();
};

export const findUserById = async (id: string) => {
  const user = await getUserById(id);
  return user;
};

export const findUserByUserName = async (username: string) => {
  return await getUserByUserName(username);
};

export const findUserProfileById = async (userId: string, res: Response) => {
  const user = await findUserById(userId);
  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }
  return {
    fullname: user.fullName,
    username: user.username,
    isAdmin: user.isAdmin,
  };
};

export const findAndUpdateUserProfileById = async (
  userId: string,
  updatedData: Partial<userDto>,
  res: Response
) => {
  const user = await findUserById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const { username } = updatedData;
  if (username) {
    const userExist = await findUserByUserName(username);
    if (userExist) {
      res.status(400);
      throw new Error("Username is already in use.");
    }
  }
  user.fullName = updatedData.fullName || user.fullName;
  user.username = updatedData.username || user.username;
  user.password = updatedData.password
    ? await bcrypt.hash(updatedData.password, 10)
    : user.password;

  const updatedUser = await saveUserAfterUpdating(user._id, {
    fullName: user.fullName,
    username: user.username,
    password: user.password,
  });

  return updatedUser;
};

export const findAndUpdateUserById = async (
  userId: string,
  updatedData: Partial<userDto>,
  res: Response
) => {
  const user = await findUserById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const { username } = updatedData;
  if (username) {
    const userExist = await findUserByUserName(username);
    if (userExist) {
      res.status(400);
      throw new Error("Username is already in use.");
    }
  }
  user.fullName = updatedData.fullName || user.fullName;
  user.username = updatedData.username || user.username;
  user.password = updatedData.password
    ? await bcrypt.hash(updatedData.password, 10)
    : user.password;
  if (updatedData.isAdmin) {
    user.isAdmin = updatedData.isAdmin;
  }

  const updatedUser = await saveUserAfterUpdating(user._id, {
    fullName: user.fullName,
    username: user.username,
    password: user.password,
    isAdmin: user.isAdmin,
  });

  return updatedUser;
};

export const findAndDeleteUserById = async (id: any, res: Response) => {
  const user = await deleteUserById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ message: "User deleted successfully" });
};

export const userLogin = async (
  username: string,
  password: string,
  res: Response
) => {
  const user = await getUserByCredentials(username);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};
