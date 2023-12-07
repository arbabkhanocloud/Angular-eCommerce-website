import { Request } from "express-serve-static-core";

export interface CustomRequest extends Request {
  user?: any;
}
