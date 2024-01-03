import { inject, injectable } from "inversify";
import { productDTO } from "../dto/Product";
import { Response } from "express";
import { ProductRepository } from "../repositories/Product";
import { ErrorService } from "../errors/ErrorService";

@injectable()
export class ProductService {
  constructor(
    @inject(ProductRepository) private productRepo: ProductRepository
  ) {}

  async addNewProduct(product: productDTO) {
    const isProductExist = await this.findProductByName(product.name);
    if (isProductExist) {
      throw new ErrorService(400, "Product Already Exist.");
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

  async updateProductById(productId: string, productData: productDTO) {
    const product = await this.findProductById(productId);

    if (!product) {
      throw new ErrorService(404, "Product not found.");
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

    return updatedProduct;
  }

  async deleteProductById(productId: string) {
    const product = await this.productRepo.deleteProductById(productId);

    if (!product) {
      throw new ErrorService(404, "Product not found.");
    }

    return { message: "Product deleted successfully" };
  }
}
