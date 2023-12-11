import express from "express";
import {
  updateUserById,
  deletUserById,
  login,
  getAllUser,
  signup,
  getUserById,
  getUserProfile,
  updateUserProfile,
} from "../controllers/User";
import {
  authenticateUser,
  authenticateUserAsAdmin,
} from "../middlreware/Athentication";

const router = express.Router();

router.route("/signup").post(signup);
router.post("/login", login);
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
