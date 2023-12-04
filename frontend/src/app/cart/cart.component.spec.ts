import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Location } from '@angular/common';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [AppModule, RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Location, useValue: mockLocation },
      ],
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockStore.select.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show go back button and empty cart message when cart is empty', () => {
    mockStore.select.and.returnValue(of([]));
    fixture.detectChanges();

    const emptyCartMessage = fixture.debugElement.query(
      By.css('.empty-cart p'),
    );
    const goBackButton = fixture.debugElement.query(
      By.css('.empty-cart button'),
    );

    expect(emptyCartMessage).toBeTruthy();
    expect(goBackButton).toBeTruthy();
    expect(emptyCartMessage.nativeElement.textContent).toContain(
      'No item added to the cart.',
    );
    expect(goBackButton.nativeElement.textContent).toContain('Go Back');
  });

  it('should change route on clicking on go back button when cart is empty', () => {
    mockStore.select.and.returnValue(of([]));
    fixture.detectChanges();

    const goBackButton = fixture.debugElement.query(
      By.css('.empty-cart button'),
    );
    goBackButton.nativeElement.click();

    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('shoud show cart item and total quantity and total price when cart is not empty', () => {
    const mockCartItem = {
      item: { id: 1, name: 'Test Item', price: 10 },
      quantity: 2,
    };

    mockStore.select.and.returnValue(of([mockCartItem]));
    fixture.detectChanges();

    const cartItems = fixture.debugElement.queryAll(
      By.css('.cart-items app-cart-item'),
    );
    const totalItems = fixture.debugElement.query(By.css('.total-items'));
    const totalPrice = fixture.debugElement.query(By.css('.total-price'));

    expect(cartItems.length).toEqual(1);
    expect(totalItems.nativeElement.textContent).toContain('Total Items: 2');
    expect(totalPrice.nativeElement.textContent).toContain(
      'Total Price: $20.00',
    );
  });

  it('should call checkout method when Proceed to Checkout button is clicked', () => {
    spyOn(component, 'checkout');
    mockStore.select.and.returnValue(
      of([{ item: { id: 1, price: 10 }, quantity: 2 }]),
    );
    fixture.detectChanges();

    const checkoutButton = fixture.debugElement.query(
      By.css('.checkout button'),
    );
    checkoutButton.nativeElement.click();

    expect(component.checkout).toHaveBeenCalled();
  });

  it('should not show cart items, total items, total price, and checkout button when cart is empty', () => {
    mockStore.select.and.returnValue(of([]));
    fixture.detectChanges();

    const cartItems = fixture.debugElement.query(By.css('.cart-items'));
    const totalItems = fixture.debugElement.query(By.css('.total'));
    const totalPrice = fixture.debugElement.query(By.css('.total-price'));
    const checkoutButton = fixture.debugElement.query(
      By.css('.checkout button'),
    );

    expect(cartItems).toBeFalsy();
    expect(totalItems).toBeFalsy();
    expect(totalPrice).toBeFalsy();
    expect(checkoutButton).toBeFalsy();
  });

  it('should not show go back button and empty cart message when cart is not empty', () => {
    const mockCartItem = {
      item: { id: 1, name: 'Test Item', price: 10 },
      quantity: 2,
    };

    mockStore.select.and.returnValue(of([mockCartItem]));
    fixture.detectChanges();

    const emptyCartMessage = fixture.debugElement.query(
      By.css('.empty-cart p'),
    );
    const goBackButton = fixture.debugElement.query(
      By.css('.empty-cart button'),
    );

    expect(emptyCartMessage).toBeFalsy();
    expect(goBackButton).toBeFalsy();
  });
});
