import { ProductListingComponent } from './product-listing.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from 'src/app/services/search/search.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('product listing component testing', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;
  let searchService: jasmine.SpyObj<SearchService>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(waitForAsync(() => {
    const searchServiceSpy = jasmine.createSpyObj('SearchService', [
      'searchText$',
      'updateSearchText',
    ]);
    const cartServiceSpy = jasmine.createSpyObj('CartService', [
      'addItemToCart',
    ]);
    TestBed.configureTestingModule({
      declarations: [ProductListingComponent],
      imports: [AppModule],
      providers: [
        { provide: SearchService, useValue: searchServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ categoryType: 'Electronics' }),
            },
          },
        },
      ],
    }).compileComponents();
    searchService = TestBed.inject(
      SearchService,
    ) as jasmine.SpyObj<SearchService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  })),
    beforeEach(() => {
      fixture = TestBed.createComponent(ProductListingComponent);
      component = fixture.componentInstance;
    });

  it('it should create product listing component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an 18  products list by default', () => {
    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.products.length).toEqual(18);
  });

  it('it should render app-product component for each product in the list', () => {
    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.products.length).toEqual(18);

    component.ngOnInit();
    fixture.detectChanges();

    const productElement =
      fixture.nativeElement.querySelectorAll('app-product');

    expect(productElement.length).toEqual(18);
  });

  it('it should update product listing when input update or change', () => {
    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();
    fixture.detectChanges();

    const productElement =
      fixture.nativeElement.querySelectorAll('app-product');
    expect(productElement.length).toEqual(18);

    const newSearchText = 'mouse';
    searchTextSubject.next(newSearchText);

    fixture.detectChanges();

    const productElemen2 =
      fixture.nativeElement.querySelectorAll('app-product');
    expect(productElemen2.length).toEqual(14);
  });

  it('should update filtered products when searchText$ emits a new value', () => {
    spyOn(component, 'onSearchChange').and.callThrough();

    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();

    const newSearchText = 'mouse';
    searchTextSubject.next(newSearchText);

    expect(component.onSearchChange).toHaveBeenCalledWith(newSearchText);
    expect(component.filteredProducts.length).toEqual(14);

    fixture.detectChanges();

    const productElement =
      fixture.nativeElement.querySelectorAll('app-product');
    expect(productElement.length).toEqual(14);
  });

  it('should call cartService.addItemToCart when clicking on "add to cart"', () => {
    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();
    fixture.detectChanges();
    component.addItemToCart(component.products[0]);

    expect(cartService.addItemToCart).toHaveBeenCalledWith({
      id: 1,
      src: 'https://shopivate.pk/wp-content/uploads/2023/08/1000236536.jpg',
      name: 'Head Phone',
      price: 35,
      category: 'Electronics',
      description: 'best headphone with ultra battery duration',
    });
  });
});
