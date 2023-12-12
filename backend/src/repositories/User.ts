import { injectable } from "inversify";
import { User } from "../models/User";
import { userDto } from "../dto/User";

@injectable()
export class UserRepository {
  async getUserByUserName(username: string): Promise<userDto | null> {
    const user = await User.findOne({ username: username });
    return user;
  }

  async saveUser(userData: userDto) {
    const newUser = new User(userData);
    const newSavedUser = await newUser.save();
    return newSavedUser;
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id: string) {
    const user = await User.findById(id);
    return user;
  }

  async saveUserAfterUpdating(userId: any, user: any) {
    return await User.findByIdAndUpdate(userId, user, {
      new: true,
      runValidators: true,
    });
  }

  async deleteUserById(userId: string) {
    return await User.findByIdAndDelete(userId);
  }

  async getUserByCredentials(username: string) {
    return await User.findOne({ username });
  }
}
