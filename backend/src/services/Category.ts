import { inject, injectable } from "inversify";
import { CategoryRepository } from "../repositories/Category";
import { categoryDto } from "../dto/Category";
import { ErrorService } from "../errors/ErrorService";

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

  async addNewCategory(categoryData: categoryDto) {
    const isCategoryExist = await this.findCategoryByType(categoryData.type);

    if (isCategoryExist) {
      throw new ErrorService(400, "Category already exists.");
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

  async updateCategory(categoryId: string, categoryData: Partial<categoryDto>) {
    const category = await this.findCategoryById(categoryId);
    if (!category) {
      throw new ErrorService(404, "Category not found.");
    }

    const { type } = categoryData;
    if (type) {
      const isCategoryExist = await this.findCategoryByType(type);
      if (isCategoryExist) {
        throw new ErrorService(400, "Category type is already exist.");
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

  async deleteCategoryById(categoryId: string) {
    const category = await this.categoryRepo.deleteCategoryById(categoryId);
    if (!category) {
      throw new ErrorService(404, "Category not found");
    }
    return { message: "Category deleted successfully" };
  }
}
