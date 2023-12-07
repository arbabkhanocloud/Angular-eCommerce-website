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
  res.json({ message: err.message });
};

export default errorHanlder;
