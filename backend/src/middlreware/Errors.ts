import { ErrorService } from "../errors/ErrorService";

import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

const errorHanlder: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  console.error(err);

  if (err instanceof ErrorService) {
    console.log("Service Error object");
    res.status(err.statusCode || 500).json({ message: err.message });
  } else if (err instanceof Error) {
    res.json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHanlder;
