import { CustomRequest } from "../types/Types";
import { Response } from "express";
import { validateProduct } from "../validation/Product";
import { Proudct } from "../models/Product";
import mongoose from "mongoose";
import { validateUpdateProduct } from "../validation/Product";

export const addProduct = async (req: CustomRequest, res: Response) => {
  const { categoryId, name, imageUrl, price, description } = req.body;

  const { error } = validateProduct(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const isProductExist = await Proudct.findOne({ name });
  if (isProductExist) {
    res.status(400);
    throw new Error("Product Already Exist.");
  }

  const product = new Proudct({
    categoryId,
    name,
    imageUrl,
    price,
    description,
  });

  const addedProduct = await product.save();
  res.status(201).json(addedProduct);
};

export const getAllProuducts = async (req: CustomRequest, res: Response) => {
  const products = await Proudct.find({});
  res.status(200).json(products);
};

export const getProductById = async (req: CustomRequest, res: Response) => {
  const productId = req.params.id;
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(productId);

  if (!isValidCategoryId) {
    res.status(400);
    throw new Error("Invalid product id.");
  }

  const product = await Proudct.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  res.status(200).json(product);
};

export const getProductsByCategoryId = async (
  req: CustomRequest,
  res: Response
) => {
  const categoryId = req.params.id;
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(categoryId);

  if (!isValidCategoryId) {
    res.status(400);
    throw new Error("Invalid category id.");
  }

  const productsByCategoryId = await Proudct.find({
    categoryId: req.body.categoryId,
  });

  res.status(200).json(productsByCategoryId);
};

export const updateProduct = async (req: CustomRequest, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Empty request body.");
  }

  const productId = req.params.id;
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(productId);

  if (!isValidCategoryId) {
    res.status(400);
    throw new Error("Invalid product id.");
  }
  const product = await Proudct.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  const { error } = validateUpdateProduct(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { categoryId, name, imageUrl, price, description } = req.body;

  product.categoryId = categoryId || product.categoryId;
  product.name = name || product.name;
  product.imageUrl = imageUrl || product.imageUrl;
  product.price = price || product.price;
  product.description = description || product.description;

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req: CustomRequest, res: Response) => {
  const productId = req.params.id;
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(productId);

  if (!isValidCategoryId) {
    res.status(400);
    throw new Error("Invalid product id.");
  }

  const product = await Proudct.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  const one = await product.deleteOne();
  res.status(200).send("Product deleted succeffuly");
};
