import { injectable } from "inversify";
import { productDTO } from "../dto/Product";
import { Product } from "../models/Product";

@injectable()
export class ProductRepository {
  async createProduct(product: productDTO) {
    const newProduct = new Product(product);
    return await newProduct.save();
  }

  async getProductByName(name: string) {
    return await Product.findOne({ name });
  }

  async getAllProducts() {
    return await Product.find({});
  }

  async getProductById(id: string) {
    return await Product.findById(id);
  }

  async getProductsByCategoryId(categoryId: string) {
    return await Product.find({ categoryId: categoryId });
  }

  async updateProductById(productId: string, productData: productDTO) {
    return await Product.updateOne({ _id: productId }, { $set: productData });
  }

  async deleteProductById(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}
