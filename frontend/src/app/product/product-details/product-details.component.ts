import { Component, OnInit } from '@angular/core';
import { products } from 'data';
import { IProduct } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
  ) {}

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    const productId = Number(routeParam.get('productId'));
    this.product = products.find((product) => product.id === productId);
  }

  goBack() {
    console.log('goback');
    this.location.back();
  }
}
