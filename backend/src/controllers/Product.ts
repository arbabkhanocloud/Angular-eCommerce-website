import "express-async-errors";
import { CustomRequest } from "../types/Types";
import { Response } from "express";
import { validateProduct, validateUpdateProduct } from "../validation/Product";
import mongoose from "mongoose";
import { productDTO } from "../dto/Product";
import { productServiceInstance } from "../Server";

export const addProduct = async (req: CustomRequest, res: Response) => {
  const { error } = validateProduct(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const productData: productDTO = req.body;
  const addedProduct = await productServiceInstance.addNewProduct(productData);

  res.status(201).json(addedProduct);
};

export const getAllProuducts = async (req: CustomRequest, res: Response) => {
  const products = await productServiceInstance.findAllProducts();
  res.status(200).json(products);
};

export const getProductById = async (req: CustomRequest, res: Response) => {
  const productId = req.params.id;
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(productId);

  if (!isValidCategoryId) {
    res.status(400);
    throw new Error("Invalid product id.");
  }

  const product = await productServiceInstance.findProductById(productId);

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

  const productsByCategoryId =
    await productServiceInstance.findProductsByCategoryId(categoryId);

  res.status(200).json(productsByCategoryId);
};

export const updateProduct = async (req: CustomRequest, res: Response) => {
  const productId = req.params.id;
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(productId);

  if (!isValidCategoryId) {
    res.status(400);
    throw new Error("Invalid product id.");
  }

  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Empty request body.");
  }

  const { error } = validateUpdateProduct(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const productData: productDTO = req.body;

  const updatedProduct = await productServiceInstance.updateProductById(
    productId,
    productData
  );

  if (updatedProduct.modifiedCount > 0) {
    res.status(200).json({ message: "Product updated successfully" });
  } else {
    res.status(400);
    throw new Error("Product not found or no changes were made.");
  }
};

export const deleteProduct = async (req: CustomRequest, res: Response) => {
  const productId = req.params.id;
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(productId);

  if (!isValidCategoryId) {
    res.status(400);
    throw new Error("Invalid product id.");
  }

  const productDeleted = await productServiceInstance.deleteProductById(
    productId
  );
  res.status(200).json(productDeleted);
};
