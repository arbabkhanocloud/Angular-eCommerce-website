import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(() => {
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ productId: '1' }),
            },
          },
        },
        { provide: Location, useValue: mockLocation },
      ],
    });
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize product details from route params', () => {
    component.ngOnInit();
    expect(component.product).toBeDefined();
    expect(component.product?.name).toBe('Head Phone');
    expect(component.product?.price).toBe(35);
    expect(component.product?.description).toBe(
      'best headphone with ultra battery duration',
    );
  });

  it('should go back when the "Go Back" button is clicked', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
