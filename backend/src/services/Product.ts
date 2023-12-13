import { inject, injectable } from "inversify";
import { productDTO } from "../dto/Product";
import { Response } from "express";
import { ProductRepository } from "../repositories/Product";

@injectable()
export class ProductService {
  constructor(
    @inject(ProductRepository) private productRepo: ProductRepository
  ) {}

  async addNewProduct(product: productDTO, res: Response) {
    const isProductExist = await this.findProductByName(product.name);
    if (isProductExist) {
      res.status(400);
      throw new Error("Product Already Exist.");
    }

    return await this.productRepo.createProduct(product);
  }

  async findProductByName(name: string) {
    return await this.productRepo.getProductByName(name);
  }

  async findAllProducts() {
    return await this.productRepo.getAllProducts();
  }

  async findProductById(id: string) {
    return this.productRepo.getProductById(id);
  }

  async findProductsByCategoryId(categoryId: string) {
    return await this.productRepo.getProductsByCategoryId(categoryId);
  }

  async updateProductById(
    productId: string,
    productData: productDTO,
    res: Response
  ) {
    const product = await this.findProductById(productId);

    if (!product) {
      res.status(404);
      throw new Error("Product not found.");
    }

    const { categoryId, name, imageUrl, price, description } = productData;

    product.categoryId = categoryId || product.categoryId;
    product.name = name || product.name;
    product.imageUrl = imageUrl || product.imageUrl;
    product.price = price || product.price;
    product.description = description || product.description;

    const updatedProduct = await this.productRepo.updateProductById(
      product._id.toString(),
      {
        categoryId: product.categoryId,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        description: product.description,
      }
    );
    if (updatedProduct.modifiedCount > 0) {
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(400);
      throw new Error("Product not found or no changes were made.");
    }
  }

  async deleteProductById(productId: string, res: Response) {
    const product = await this.productRepo.deleteProductById(productId);

    if (!product) {
      res.status(404);
      throw new Error("Product not found.");
    }

    return { message: "Product deleted successfully" };
  }
}
