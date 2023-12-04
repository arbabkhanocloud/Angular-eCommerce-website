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
import { CartModule } from './cart/cart.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../app/reducer/index';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CategoriesComponent } from './categories/categories.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListingComponent,
    SearchComponent,
    NavigationComponent,
    LoginComponent,
    ProductDetailsComponent,
    CategoriesComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    CartModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
