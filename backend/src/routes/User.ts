import express from "express";
import {
  updateUserById,
  deletUserById,
  userLogin,
  getAllUser,
  userSignup,
  getUserById,
  getUserProfile,
  updateUserProfile,
} from "../controllers/User";
import {
  authenticateUser,
  authenticateUserAsAdmin,
} from "../middlreware/Athentication";

const router = express.Router();

router.route("/signup").post(userSignup);
router.post("/login", userLogin);
router.route("/").get(authenticateUser, authenticateUserAsAdmin, getAllUser);
router
  .route("/profile")
  .get(authenticateUser, getUserProfile)
  .post(authenticateUser, updateUserProfile);

router
  .route("/:id")
  .get(authenticateUser, authenticateUserAsAdmin, getUserById)
  .put(authenticateUser, authenticateUserAsAdmin, updateUserById)
  .delete(authenticateUser, authenticateUserAsAdmin, deletUserById);

export default router;
