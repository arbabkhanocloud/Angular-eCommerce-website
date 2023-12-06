import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/Types";
import { User } from "../models/User";

export const authenticateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.header("Authorization");
  let jwtToken;
  if (authorizationHeader && authorizationHeader?.startsWith("Bearer")) {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error(
        "JWT_SECRET_KEY is not defined in the environment variables"
      );
    }
    try {
      const [bearer, token] = authorizationHeader.split(" ");
      jwtToken = token;

      const decodedJWT = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = (decodedJWT as { id?: string })?.id;
      const user = await User.findById(userId);
      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authrozied, Token failed");
    }
  }

  if (!jwtToken) {
    res.status(401);
    throw new Error("UnAuthorized, no token");
  }
};

export const authenticateUserAsAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Access forbidden - User is not an admin.");
  }
};
