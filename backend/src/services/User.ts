import { injectable, inject } from "inversify";
import { Response } from "express";
import bcrypt from "bcrypt";
import { userDto } from "../dto/User";
import { generateToken } from "../utils/GenerateToken";
import { UserRepository } from "../repositories/User";

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async registerNewUser(userData: userDto, res: Response) {
    const userExist = await this.userRepository.getUserByUserName(
      userData.username
    );

    if (userExist) {
      res.status(400);
      throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await this.userRepository.saveUser(userData);

    return {
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    };
  }

  async findAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async findUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async findUserByUserName(username: string) {
    return await this.userRepository.getUserByUserName(username);
  }

  async findUserProfileById(userId: string, res: Response) {
    const user = await this.findUserById(userId);
    if (!user) {
      res.status(400);
      throw new Error("User not found.");
    }
    return {
      fullname: user.fullName,
      username: user.username,
      isAdmin: user.isAdmin,
    };
  }

  async updateUserProfileById(
    userId: string,
    updatedData: Partial<userDto>,
    res: Response
  ) {
    const user = await this.findUserById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    const { username } = updatedData;
    if (username) {
      const userExist = await this.findUserByUserName(username);
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

    const updatedUser = await this.userRepository.updateUser(user._id, {
      fullName: user.fullName,
      username: user.username,
      password: user.password,
    });
    if (updatedUser.modifiedCount > 0) {
      res.status(200).json({ message: "User Profile updated successfully" });
    } else {
      res.status(400);
      throw new Error("User not found or no changes were made.");
    }
  }

  async updateUserById(
    userId: string,
    updatedData: Partial<userDto>,
    res: Response
  ) {
    const user = await this.findUserById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    const { username } = updatedData;
    if (username) {
      const userExist = await this.findUserByUserName(username);
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

    const updatedUser = await this.userRepository.updateUser(user._id, {
      fullName: user.fullName,
      username: user.username,
      password: user.password,
      isAdmin: user.isAdmin,
    });

    if (updatedUser.modifiedCount > 0) {
      res.status(200).json({ message: "User Profile updated successfully" });
    } else {
      res.status(400);
      throw new Error("User not found or no changes were made.");
    }
  }

  async findAndDeleteUserById(id: any, res: Response) {
    const user = await this.userRepository.deleteUserById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json({ message: "User deleted successfully" });
  }

  async userLogin(username: string, password: string, res: Response) {
    const user = await this.userRepository.getUserByCredentials(username);
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
  }
}
