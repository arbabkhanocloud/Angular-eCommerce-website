import express from "express";
import {
  createCategory,
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
  .post(authenticateUser, authenticateUserAsAdmin, createCategory);
router
  .route("/:id")
  .put(authenticateUser, authenticateUserAsAdmin, updateCategory)
  .delete(authenticateUser, authenticateUserAsAdmin, deleteCategory);

export default router;
