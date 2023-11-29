import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material/material.module';
import { ProductComponent } from './product/product/product.component';
import { ProductListingComponent } from './product/product-listing/product-listing.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './shared/components/search/search.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListingComponent,
    SearchComponent,
    NavigationComponent,
    LoginComponent,
    CartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
