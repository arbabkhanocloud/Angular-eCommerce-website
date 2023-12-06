import express from "express";
import {
  addProduct,
  getAllProuducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
} from "../controllers/Product";

const router = express.Router();

router.route("/").get(getAllProuducts).post(addProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);
router.route("/category/:id").get(getProductsByCategoryId);

export default router;
