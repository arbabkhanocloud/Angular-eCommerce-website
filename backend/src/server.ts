import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHanlder from "./middlreware/Errors";
import User from "./routes/User";
import { databaseConnection } from "./config/DatabaseConnection";

dotenv.config();
const app: Application = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:4200"],
  })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use("/api/users", User);

app.use(errorHanlder);

app.listen(port, async () => {
  try {
    await databaseConnection();
    console.log(`Server is Fired at http://localhost:${port}`);
  } catch (err) {
    console.error("Could not connect to the MongoDB");
  }
});
