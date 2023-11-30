import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { MaterialModule } from 'src/app/material/material/material.module';
import { By } from '@angular/platform-browser';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [MaterialModule],
    });

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create product component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display product information', () => {
    const product = {
      id: 0,
      name: 'Test Product',
      category: 'Test Category',
      src: 'test-image.jpg',
      price: 19.99,
      description: 'asdf',
    };

    component.product = product;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(
      By.css('mat-card-title'),
    ).nativeElement;
    const subtitleElement = fixture.debugElement.query(
      By.css('mat-card-subtitle'),
    ).nativeElement;
    const imageElement = fixture.debugElement.query(
      By.css('img'),
    ).nativeElement;
    const priceElement = fixture.debugElement.query(
      By.css('mat-card-content span'),
    ).nativeElement;

    expect(titleElement.textContent).toContain(product.name);
    expect(subtitleElement.textContent).toContain(product.category);
    expect(imageElement.src).toContain(product.src);
    expect(priceElement.textContent).toContain('19.99');
  });

  it('should emit onAdd event', () => {
    const product = {
      id: 1,
      name: 'Test Product',
      category: 'Test Category',
      src: 'test-image.jpg',
      price: 19.99,
      description: 'asdfsdfsdf',
    };

    spyOn(component, 'onAddItem');
    component.product = product;
    fixture.detectChanges();

    const addButton = fixture.debugElement.query(
      By.css('.add-btn'),
    ).nativeElement;
    addButton.click();

    expect(component.onAddItem).toHaveBeenCalledWith(product);
  });
  it('should emit addItemEvent on clicking Add Item button', () => {
    const product = {
      id: 1,
      name: 'Test Product',
      category: 'Test Category',
      src: 'test-image.jpg',
      price: 19.99,
      description: 'asdfsdfsdf',
    };

    spyOn(component.addItemEvent, 'emit');
    component.product = product;
    fixture.detectChanges();

    const addButton = fixture.debugElement.query(
      By.css('.add-btn'),
    ).nativeElement;
    addButton.click();

    expect(component.addItemEvent.emit).toHaveBeenCalledWith(product);
  });
});
