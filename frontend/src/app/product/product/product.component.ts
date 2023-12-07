import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: IProduct;
  @Output() addItemEvent: EventEmitter<IProduct> = new EventEmitter();

  onAddItem(product: IProduct) {
    this.addItemEvent.emit(product);
  }
}
