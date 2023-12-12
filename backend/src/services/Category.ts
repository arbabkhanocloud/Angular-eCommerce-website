import { inject, injectable } from "inversify";
import { Response } from "express";
import { CategoryRepository } from "../repositories/Category";
import { categoryDto } from "../dto/Category";

@injectable()
export class CategoryService {
  constructor(
    @inject(CategoryRepository) private categoryRepo: CategoryRepository
  ) {}

  async findAllCategories() {
    return await this.categoryRepo.getAllCategories();
  }

  async findCategoryById(id: string) {
    return await this.categoryRepo.getCategoryById(id);
  }

  async addNewCategory(categoryData: categoryDto, res: Response) {
    const isCategoryExist = await this.findCategoryByType(categoryData.type);

    if (isCategoryExist) {
      res.status(400);
      throw new Error("Category already exists.");
    }

    const newCategory = await this.categoryRepo.createCategory(categoryData);

    return {
      _id: newCategory._id,
      type: newCategory.type,
      imageUrl: newCategory.imageUrl,
    };
  }

  async findCategoryByType(type: string): Promise<any> {
    return await this.categoryRepo.getCategoryByType(type);
  }

  async updateCategory(
    categoryId: string,
    categoryData: Partial<categoryDto>,
    res: Response
  ) {
    const category = await this.findCategoryById(categoryId);
    if (!category) {
      res.status(404);
      throw new Error("Category not found.");
    }

    const { type } = categoryData;
    if (type) {
      const isCategoryExist = await this.findCategoryByType(type);
      if (isCategoryExist) {
        res.status(400);
        throw new Error("Category is already in exist.");
      }
    }

    category.type = categoryData.type || category.type;
    category.imageUrl = categoryData.imageUrl || category.imageUrl;

    const updatedCategory = await this.categoryRepo.updateCategory(
      category._id,
      {
        type: category.type,
        imageUrl: category.imageUrl,
      }
    );

    return updatedCategory;
  }

  async deleteCategoryById(categoryId: string, res: Response) {
    const category = await this.categoryRepo.deleteCategoryById(categoryId);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    return { message: "Category deleted successfully" };
  }
}
