import express from "express";
import { getAllUser } from "../controllers/User";
import { userSignup } from "../controllers/User";
import { getUserById } from "../controllers/User";
import { updateUserById, deletUserById, userLogin } from "../controllers/User";

const router = express.Router();

router.route("/").get(getAllUser).post(userSignup);
router.post("/login", userLogin);
router.route("/:id").get(getUserById).put(updateUserById).delete(deletUserById);

export default router;
