import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICategory, categories, CategorType } from './categories.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: ICategory[] = categories;
  filteredCategories: ICategory[] = [];
  categoryType = CategorType;

  private searchSubscription!: Subscription;
  constructor(
    private readonly router: Router,
    private searchService: SearchService,
  ) {
    this.searchService.updateSearchText('');
  }

  ngOnInit(): void {
    this.filteredCategories = this.categories;

    this.searchSubscription = this.searchService.searchText$.subscribe(
      (searchText) => {
        this.onSearchChange(searchText);
      },
    );
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchChange(searchText: string) {
    if (searchText) {
      this.filteredCategories = this.categories.filter((category) =>
        category.type.toLowerCase().includes(searchText.toLowerCase()),
      );
    } else {
      this.filteredCategories = this.categories;
    }
  }

  shopNow(categoryType: CategorType) {
    this.router.navigate([categoryType]);
  }
}
