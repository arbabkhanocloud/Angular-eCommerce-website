import { ProductListingComponent } from './product-listing.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { SearchComponent } from '../search/search.component';
import { By } from '@angular/platform-browser';

describe('product listing component testing', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListingComponent, SearchComponent],
      imports: [AppModule],
    }).compileComponents();
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
    fixture.detectChanges();
    expect(component.products).toEqual(newProducts);
    const productElement =
      fixture.nativeElement.querySelectorAll('app-product');
    expect(productElement.length).toEqual(2);
  });

  it('should update filteredProducts when search input changes', () => {
    const searchComponentInstance = fixture.debugElement.query(
      By.directive(SearchComponent),
    );

    searchComponentInstance.componentInstance.searchChange.emit('mouse');
    expect(component.filteredProducts.length).toEqual(17);
  });
});
