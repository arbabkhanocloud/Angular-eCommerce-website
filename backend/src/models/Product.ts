import mongoose from "mongoose";
import { productDTO } from "../dto/Product";

const productSchema = new mongoose.Schema<productDTO>(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: {
      type: String,
      required: true,
      default: "No product description available right now.",
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
