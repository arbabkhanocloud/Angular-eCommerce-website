import { Request, Response } from "express";
import users from "../data/User";
import { validateUser } from "../validation/User";
import { User } from "../models/User";

export const getAllUser = async (req: Request, res: Response) => {
  res.send(users);
};

export const addNewuser = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const userExists = await User.findOne({ username: String });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  let user = new User({
    fullName: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  user = await user.save();
  res.send(user);
};
