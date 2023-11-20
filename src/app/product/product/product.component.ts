import { Component, Input } from '@angular/core';
import { IProduct } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: IProduct;

  onAdd(product: IProduct) {
    console.log(product);
  }
}
