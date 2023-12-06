import mongoose from "mongoose";
import { productDTO } from "../dto/Product";

const productSchema = new mongoose.Schema<productDTO>({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  description: {
    type: String,
    required: true,
    default: "No product description available right now.",
  },
});

export const Proudct = mongoose.model("Product", productSchema);
