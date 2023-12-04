import express from "express";
import { getAllUser } from "../controllers/User";
import { addNewuser } from "../controllers/User";

const router = express.Router();

router.get("/", getAllUser);
router.post("/adduser", addNewuser);

export default router;
