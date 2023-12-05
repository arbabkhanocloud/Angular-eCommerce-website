import express from "express";
import { getAllUser } from "../controllers/User";
import { userSignup } from "../controllers/User";
import { getUserById } from "../controllers/User";
import { updateUserById, deletUserById, userLogin } from "../controllers/User";
import {
  authenticateUser,
  authenticateUserAsAdmin,
} from "../middlreware/Athentication";

const router = express.Router();

router.route("/").get(authenticateUser, getAllUser).post(userSignup);
router.post("/login", userLogin);
router
  .route("/:id")
  .get(authenticateUser, authenticateUserAsAdmin, getUserById)
  .put(authenticateUser, authenticateUserAsAdmin, updateUserById)
  .delete(authenticateUser, authenticateUserAsAdmin, deletUserById);

export default router;
