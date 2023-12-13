import { injectable, inject } from "inversify";
import { Response } from "express";
import bcrypt from "bcrypt";
import { userDto } from "../dto/User";
import { generateToken } from "../utils/GenerateToken";
import { UserRepository } from "../repositories/User";
import { ErrorService } from "../errors/ErrorService";

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async registerNewUser(userData: userDto) {
    const userExist = await this.userRepository.getUserByUserName(
      userData.username
    );

    if (userExist) {
      throw new ErrorService(400, "User already exists.");
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

  async findUserByUserName(username: string) {
    return await this.userRepository.getUserByUserName(username);
  }

  async findUserById(userId: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new ErrorService(404, "User not found.");
    }
    return {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      isAdmin: user.isAdmin,
      password: user.password,
    };
  }

  async updateUserProfileById(userId: string, updatedData: Partial<userDto>) {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new ErrorService(404, "User not found.");
    }

    const { username } = updatedData;
    if (username) {
      const userExist = await this.findUserByUserName(username);
      if (userExist) {
        throw new ErrorService(400, "Username is already in use.");
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

    return updatedUser;
  }

  async updateUserById(userId: string, updatedData: Partial<userDto>) {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new ErrorService(404, "User not found.");
    }

    const { username } = updatedData;
    if (username) {
      const userExist = await this.findUserByUserName(username);
      if (userExist) {
        throw new ErrorService(400, "Username is already in use.");
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

    return updatedUser;
  }

  async findAndDeleteUserById(id: any) {
    const user = await this.userRepository.deleteUserById(id);
    if (!user) {
      throw new ErrorService(404, "User not found.");
    }
    return { message: "User deleted successfully" };
  }

  async userLogin(username: string, password: string) {
    const user = await this.userRepository.getUserByCredentials(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      return {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        isAdmin: user.isAdmin,
        token: token,
      };
    } else {
      throw new ErrorService(401, "Invalid username or password");
    }
  }
}
