import { Component } from '@angular/core';
import { products } from 'data';
import { IProduct } from '../product.model';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent {
  products: IProduct[] = products;
}
