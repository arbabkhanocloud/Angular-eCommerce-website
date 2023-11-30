import { Component } from '@angular/core';
import { ICategory, categories, CategorType } from './categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: ICategory[] = categories;
  categoryType = CategorType;

  shopNow(categoryType: CategorType) {
    console.log('categoryType: ', categoryType);
  }
}
