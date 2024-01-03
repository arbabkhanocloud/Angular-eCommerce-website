import { injectable } from "inversify";
import { Category } from "../models/Category";
import { categoryDto } from "../dto/Category";

@injectable()
export class CategoryRepository {
  async getCategoryByType(type: string) {
    return await Category.findOne({ type: type });
  }

  async getAllCategories() {
    return await Category.find();
  }

  async getCategoryById(id: string) {
    return await Category.findById(id);
  }

  async createCategory(categoryData: categoryDto) {
    const newCategory = new Category(categoryData);
    return await newCategory.save();
  }

  async updateCategory(categoryId: any, categoryData: categoryDto) {
    return await Category.updateOne(
      { _id: categoryId },
      { $set: categoryData }
    );
  }

  async deleteCategoryById(categoryId: string) {
    return await Category.findByIdAndDelete(categoryId);
  }
}
