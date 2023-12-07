import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../services/cart/cart.service';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    mockCartService = jasmine.createSpyObj('CartService', ['clearCart']);
    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [AppModule, StoreModule.forRoot({})],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: CartService, useValue: mockCartService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation },
      ],
    });
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Checkout text, order summary, and Go Back button', () => {
    const checkoutText = fixture.nativeElement.querySelector(
      '.checkout-container h1',
    );
    const orderSummaryText =
      fixture.nativeElement.querySelector('.order-summary h2');
    const goBackButton = fixture.nativeElement.querySelector('.back-btn');

    expect(checkoutText).not.toBeNull();
    expect(orderSummaryText).not.toBeNull();
    expect(goBackButton).not.toBeNull();

    expect(checkoutText.textContent).toContain('Checkout');
    expect(orderSummaryText.textContent).toContain('Order Summary');
    expect(goBackButton.textContent).toContain('Go Back');
  });

  it('should display correct order summary with mocked store', () => {
    const mockCartItem = {
      item: { id: 1, name: 'Test Item', price: 10 },
      quantity: 2,
    };

    mockStore.select.and.returnValue(of([mockCartItem]));
    fixture.detectChanges();
    const totalItemsText = fixture.nativeElement.querySelector(
      '.order-summary .total-items',
    );
    const totalPriceText = fixture.nativeElement.querySelector(
      '.order-summary .total-price',
    );

    // Log the values to debug
    // console.log('totalItemsText:', totalItemsText);
    // console.log('totalPriceText:', totalPriceText);

    expect(totalItemsText.textContent).toContain('Total Items: 2');
    expect(totalPriceText.textContent).toContain('Total Price: $20.00');
  });

  it('should call Location.back() on goBack()', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should call CartService.clearCart() and navigate to "/" on placeOrder()', () => {
    spyOn(window, 'alert');
    component.placeOrder();
    expect(window.alert).toHaveBeenCalledWith(
      'Your order has been placed thank you',
    );
    expect(mockCartService.clearCart).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });
});
