import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { CartService } from './cart.service';
import * as CartActions from '../../cart/cart.actions';
import { IProduct } from 'src/app/product/product.model';

describe('CartService', () => {
  let service: CartService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [CartService, provideMockStore()],
    });

    service = TestBed.inject(CartService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch setIsCartOpen action', () => {
    const spyDispatch = spyOn(store, 'dispatch');
    const isOpen = true;
    service.setIsCartOpen(isOpen);
    expect(spyDispatch).toHaveBeenCalledWith(
      CartActions.setIsCartOpen({ isOpen }),
    );
  });

  it('should dispatch addItemToCart action', () => {
    const spyDispatch = spyOn(store, 'dispatch');
    const item: IProduct = {
      id: 1,
      name: 'Test Product',
      category: 'Test Category',
      src: 'test-image.jpg',
      price: 19.99,
      description: 'Test description',
    };
    service.addItemToCart(item);
    expect(spyDispatch).toHaveBeenCalledWith(
      CartActions.addItemToCart({ item }),
    );
  });

  it('should dispatch removeItemFromCart action', () => {
    const spyDispatch = spyOn(store, 'dispatch');
    const item: IProduct = {
      id: 1,
      name: 'Test Product',
      category: 'Test Category',
      src: 'test-image.jpg',
      price: 19.99,
      description: 'Test description',
    };
    service.removeItemFromCart(item);
    expect(spyDispatch).toHaveBeenCalledWith(
      CartActions.removeItemFromCart({ item }),
    );
  });

  it('should dispatch deleteItemFromCart action', () => {
    const spyDispatch = spyOn(store, 'dispatch');
    const item: IProduct = {
      id: 1,
      name: 'Test Product',
      category: 'Test Category',
      src: 'test-image.jpg',
      price: 19.99,
      description: 'Test description',
    };
    service.deleteItemFromCart(item);
    expect(spyDispatch).toHaveBeenCalledWith(
      CartActions.deleteItemFromCart({ item }),
    );
  });

  it('should dispatch clearCart action', () => {
    const spyDispatch = spyOn(store, 'dispatch');

    service.clearCart();
    expect(spyDispatch).toHaveBeenCalledWith(CartActions.clearCart());
  });
});
