import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemComponent } from './cart-item.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material/material.module';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', [
      'removeItemFromCart',
      'addItemToCart',
      'deleteItemFromCart',
    ]);
    TestBed.configureTestingModule({
      declarations: [CartItemComponent],
      providers: [{ provide: CartService, useValue: cartServiceSpy }],
      imports: [StoreModule.forRoot({}), MaterialModule],
    });
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should create', () => {
    component.cartItem = {
      item: {
        id: 1,
        src: 'https://shopivate.pk/wp-content/uploads/2023/08/1000236536.jpg',
        name: 'Head Phone',
        price: 35,
        category: 'Electronics',
        description: 'best headphone with ultra battery duration',
      },
      quantity: 1,
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call cartService.removeItemFromCart when decrementItem is called', () => {
    component.cartItem = {
      item: {
        id: 1,
        src: 'https://shopivate.pk/wp-content/uploads/2023/08/1000236536.jpg',
        name: 'Head Phone',
        price: 35,
        category: 'Electronics',
        description: 'best headphone with ultra battery duration',
      },
      quantity: 1,
    };
    fixture.detectChanges();
    const item = component.cartItem.item;
    component.decrementItem(item);
    expect(cartService.removeItemFromCart).toHaveBeenCalledWith(item);
  });

  it('should call cartService.addItemToCart when incrementItem is called', () => {
    component.cartItem = {
      item: {
        id: 1,
        src: 'https://shopivate.pk/wp-content/uploads/2023/08/1000236536.jpg',
        name: 'Head Phone',
        price: 35,
        category: 'Electronics',
        description: 'best headphone with ultra battery duration',
      },
      quantity: 1,
    };
    fixture.detectChanges();
    const item = component.cartItem.item;
    component.incrementItem(item);
    expect(cartService.addItemToCart).toHaveBeenCalledWith(item);
  });

  it('should call cartService.deleteItemFromCart when deleteItem is called', () => {
    component.cartItem = {
      item: {
        id: 1,
        src: 'https://shopivate.pk/wp-content/uploads/2023/08/1000236536.jpg',
        name: 'Head Phone',
        price: 35,
        category: 'Electronics',
        description: 'best headphone with ultra battery duration',
      },
      quantity: 1,
    };
    fixture.detectChanges();
    const item = component.cartItem.item;
    component.deleteItem(item);
    expect(cartService.deleteItemFromCart).toHaveBeenCalledWith(item);
  });

  it('should display the correct item price based on quantity and price', () => {
    component.cartItem = {
      item: {
        id: 1,
        src: 'https://shopivate.pk/wp-content/uploads/2023/08/1000236536.jpg',
        name: 'Head Phone',
        price: 35,
        category: 'Electronics',
        description: 'best headphone with ultra battery duration',
      },
      quantity: 3,
    };
    fixture.detectChanges();

    const itemPriceElement = fixture.nativeElement.querySelector('.item-price');
    expect(itemPriceElement.textContent).toContain('$105');
  });
});
