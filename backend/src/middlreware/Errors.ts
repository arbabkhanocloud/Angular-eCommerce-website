import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

const errorHanlder: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  res.status(500).send("Something Failed");
};

export default errorHanlder;
