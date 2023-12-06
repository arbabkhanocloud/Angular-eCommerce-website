import mongoose from "mongoose";
import { orderDTO } from "../dto/Order";

const orderSchema = new mongoose.Schema<orderDTO>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingDetails: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
