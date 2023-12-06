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

router
  .route("/")
  .get(authenticateUser, authenticateUserAsAdmin, getAllProuducts)
  .post(authenticateUser, authenticateUserAsAdmin, addProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);
router.route("/category/:id").get(getProductsByCategoryId);

export default router;
