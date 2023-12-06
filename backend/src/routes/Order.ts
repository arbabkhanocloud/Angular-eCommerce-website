import express from "express";
import {
  addOrder,
  getAllOrders,
  getOrdersByUserId,
} from "../controllers/Order";
import {
  authenticateUser,
  authenticateUserAsAdmin,
} from "../middlreware/Athentication";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, authenticateUserAsAdmin, getAllOrders)
  .post(authenticateUser, addOrder);

router.route("/userorders").get(authenticateUser, getOrdersByUserId);

export default router;
