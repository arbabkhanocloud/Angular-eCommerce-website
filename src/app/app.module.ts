import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material/material.module';
import { ProductComponent } from './product/product/product.component';
import { ProductListingComponent } from './product/product-listing/product-listing.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './product/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListingComponent,
    SearchComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
