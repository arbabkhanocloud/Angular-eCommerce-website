import "express-async-errors";
import { CustomRequest } from "../types/Types";
import { Response } from "express";
import { Category } from "../models/Category";
import { validateCategory } from "../validation/Category";
import mongoose from "mongoose";

export const getAllCategories = async (req: CustomRequest, res: Response) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

export const addCategory = async (req: CustomRequest, res: Response) => {
  const { error } = validateCategory(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const categoryExist = await Category.findOne({ type: req.body.type });
  const categoryExistByImageUrl = await Category.findOne({
    imageUrl: req.body.imageUrl,
  });

  if (categoryExist && categoryExistByImageUrl) {
    res.status(400);
    throw new Error("Category Already exist.");
  }

  let category = new Category({
    type: req.body.type,
    imageUrl: req.body.imageUrl,
  });

  category = await category.save();
  res.status(200).json(category);
};

export const updateCategory = async (req: CustomRequest, res: Response) => {
  const categoryId = req.params.id;
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(categoryId);

  if (!isValidCategoryId) {
    res.status(400);
    throw new Error("Invalid category id.");
  }

  const { error } = validateCategory(req.body);

  if (error) {
    res.status(400);
    throw new Error(`${error.details[0].message}`);
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  category.type = req.body.type;
  category.imageUrl = req.body.imageUrl;

  const updatedCategory = await category.save();
  res.status(201).json(updatedCategory);
};

export const deleteCategory = async (req: CustomRequest, res: Response) => {
  const categoryId = req.params.id;
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(categoryId);

  if (!isValidCategoryId) {
    res.status(400);
    throw new Error("Invalid category Id.");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  await category.deleteOne();
  res.status(200).json({ message: "Category deleted successfully" });
};
