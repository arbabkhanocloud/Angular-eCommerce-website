import { Component, OnInit } from '@angular/core';
import { products } from 'data';
import { IProduct } from '../product.model';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  products: IProduct[] = products;
  filteredProducts: IProduct[] = [];

  ngOnInit(): void {
    this.filteredProducts = this.products;
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
}
