import express from "express";
import {
  addProduct,
  getAllProuducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
} from "../controllers/Product";

import {
  authenticateUser,
  authenticateUserAsAdmin,
} from "../middlreware/Athentication";

const router = express.Router();

router.route("/category/:id").get(getProductsByCategoryId);
router
  .route("/")
  .get(authenticateUser, authenticateUserAsAdmin, getAllProuducts)
  .post(authenticateUser, authenticateUserAsAdmin, addProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(authenticateUser, authenticateUserAsAdmin, updateProduct)
  .delete(authenticateUser, authenticateUserAsAdmin, deleteProduct);

export default router;
