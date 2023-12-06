import mongoose from "mongoose";
import { categoryDto } from "../dto/User";

const categorySchema = new mongoose.Schema<categoryDto>({
  type: { type: String, required: true },
  imageUrl: { type: String, required: false },
});

export const Category = mongoose.model("Category", categorySchema);
