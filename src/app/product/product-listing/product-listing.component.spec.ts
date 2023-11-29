import { ProductListingComponent } from './product-listing.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { SearchService } from 'src/app/services/search.service';
import { BehaviorSubject } from 'rxjs';

describe('product listing component testing', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;
  let searchService: jasmine.SpyObj<SearchService>;

  beforeEach(waitForAsync(() => {
    const searchServiceSpy = jasmine.createSpyObj('SearchService', [
      'searchText$',
    ]);
    TestBed.configureTestingModule({
      declarations: [ProductListingComponent],
      imports: [AppModule],
      providers: [{ provide: SearchService, useValue: searchServiceSpy }],
    }).compileComponents();
    searchService = TestBed.inject(
      SearchService,
    ) as jasmine.SpyObj<SearchService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
  });

  it('it should create product listing component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an 21  products list by default', () => {
    expect(component.products.length).toEqual(21);
  });

  it('it should render app-product component for each product in the list', () => {
    expect(component.products.length).toEqual(21);
    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();
    fixture.detectChanges();

    const productElement =
      fixture.nativeElement.querySelectorAll('app-product');
    expect(productElement.length).toEqual(21);
  });

  it('it should update product listing when input update or change', () => {
    const newProducts = [
      {
        id: 0,
        name: 'Test Product',
        category: 'Test Category',
        src: 'test-image.jpg',
        price: 19.99,
        description: 'product 1 testing description',
      },
      {
        id: 1,
        name: 'Test Product 2',
        category: 'Test Category 2',
        src: 'test2-image.jpg',
        price: 50,
        description: 'product 2 testing description',
      },
    ];

    component.products = newProducts;
    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.products).toEqual(newProducts);
    const productElement =
      fixture.nativeElement.querySelectorAll('app-product');
    expect(productElement.length).toEqual(2);

    const newSearchText = 'Test Product 2';
    searchTextSubject.next(newSearchText);

    fixture.detectChanges();

    const productElemen2 =
      fixture.nativeElement.querySelectorAll('app-product');
    expect(productElemen2.length).toEqual(1);
  });

  it('should update filtered products when searchText$ emits a new value', () => {
    spyOn(component, 'onSearchChange').and.callThrough();

    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();

    const newSearchText = 'mouse';
    searchTextSubject.next(newSearchText);

    expect(component.onSearchChange).toHaveBeenCalledWith(newSearchText);
    expect(component.filteredProducts.length).toEqual(17);

    fixture.detectChanges();

    const productElement =
      fixture.nativeElement.querySelectorAll('app-product');
    expect(productElement.length).toEqual(17);
  });
});
