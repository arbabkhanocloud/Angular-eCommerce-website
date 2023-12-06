import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHanlder from "./middlreware/Errors";
import User from "./routes/User";
import Category from "./routes/Category";
import Product from "./routes/Product";
import Order from "./routes/Order";
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
  res.send("Serve is up and Running...");
});
app.use("/api/users", User);
app.use("/api/category", Category);
app.use("/api/product", Product);
app.use("/api/order", Order);

app.listen(port, async () => {
  try {
    await databaseConnection();
    console.log(`Server is Fired at http://localhost:${port}`);
  } catch (err) {
    console.error("Could not connect to the MongoDB");
  }
});

app.use(errorHanlder);
