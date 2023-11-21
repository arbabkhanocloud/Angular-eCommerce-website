import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material/material.module';
import { ProductComponent } from './product/product/product.component';
import { ProductListingComponent } from './product/product-listing/product-listing.component';

@NgModule({
  declarations: [AppComponent, ProductComponent, ProductListingComponent],
  imports: [BrowserModule, AppRoutingModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
