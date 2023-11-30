import { Component } from '@angular/core';
import { ICategory, categories, CategorType } from './categories.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: ICategory[] = categories;
  categoryType = CategorType;

  constructor(private readonly router: Router) {}

  shopNow(categoryType: CategorType) {
    this.router.navigate([categoryType]);
  }
}
