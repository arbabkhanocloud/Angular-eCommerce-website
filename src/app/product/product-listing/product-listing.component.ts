import { Component, OnInit, OnDestroy } from '@angular/core';
import { products } from 'data';
import { IProduct } from '../product.model';
import { SearchService } from 'src/app/services/search/search.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit, OnDestroy {
  products: IProduct[] = products;
  filteredProducts: IProduct[] = [];
  private searchSubscription!: Subscription;
  constructor(
    private searchService: SearchService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.filteredProducts = this.products;
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
      this.filteredProducts = this.products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.price.toString().includes(searchText.toLowerCase()) ||
          product.category.toLowerCase().includes(searchText.toLowerCase()),
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  addItemToCart(product: IProduct) {
    this.cartService.addItemToCart(product);
  }
}
