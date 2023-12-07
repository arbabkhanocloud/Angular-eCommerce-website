import mongoose from "mongoose";

export type productDTO = {
  categoryId: mongoose.Schema.Types.ObjectId;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
};
