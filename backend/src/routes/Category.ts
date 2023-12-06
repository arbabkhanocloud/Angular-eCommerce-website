import express from "express";
import {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/Category";
import {
  authenticateUser,
  authenticateUserAsAdmin,
} from "../middlreware/Athentication";

const router = express.Router();

router
  .route("/")
  .get(getAllCategories)
  .post(authenticateUser, authenticateUserAsAdmin, addCategory);
router
  .route("/:id")
  .put(authenticateUser, authenticateUserAsAdmin, updateCategory)
  .delete(authenticateUser, authenticateUserAsAdmin, deleteCategory);

export default router;
