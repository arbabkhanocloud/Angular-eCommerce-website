import express from "express";
import {
  updateUserById,
  deletUserById,
  userLogin,
  getAllUser,
  userSignup,
  getUserById,
} from "../controllers/User";
import {
  authenticateUser,
  authenticateUserAsAdmin,
} from "../middlreware/Athentication";

const router = express.Router();

router.post("/login", userLogin);
router
  .route("/")
  .get(authenticateUser, authenticateUserAsAdmin, getAllUser)
  .post(userSignup);
router
  .route("/:id")
  .get(authenticateUser, authenticateUserAsAdmin, getUserById)
  .put(authenticateUser, authenticateUserAsAdmin, updateUserById)
  .delete(authenticateUser, authenticateUserAsAdmin, deletUserById);

export default router;
