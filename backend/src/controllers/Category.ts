import { Response } from "express";
import { categoryServiceInstance } from "../Server";
import { CustomRequest } from "../types/Types";
import { validateCategory } from "../validation/Category";
import { categoryDto } from "../dto/Category";

import mongoose from "mongoose";

export const getAllCategories = async (req: any, res: Response) => {
  const categories = await categoryServiceInstance.findAllCategories();
  res.status(200).json(categories);
};

export const createCategory = async (req: CustomRequest, res: Response) => {
  const { error } = validateCategory(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const categoryData: categoryDto = req.body;
  const createdCategory = await categoryServiceInstance.addNewCategory(
    categoryData,
    res
  );

  res.status(200).json(createdCategory);
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

  const { type, imageUrl } = req.body;

  await categoryServiceInstance.updateCategory(
    categoryId,
    {
      type,
      imageUrl,
    },
    res
  );
};

export const deleteCategory = async (req: CustomRequest, res: Response) => {
  const categoryId = req.params.id;
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(categoryId);
  if (!isValidCategoryId) {
    res.status(400);
    throw new Error("Invalid user id");
  }

  const categoryDeleted = await categoryServiceInstance.deleteCategoryById(
    categoryId,
    res
  );
  res.status(200).json(categoryDeleted);
};
