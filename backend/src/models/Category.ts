import mongoose from "mongoose";
import { categoryDto } from "../dto/Category";

const categorySchema = new mongoose.Schema<categoryDto>(
  {
    type: { type: String, required: true },
    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
