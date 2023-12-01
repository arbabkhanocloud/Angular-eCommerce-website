import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { MaterialModule } from '../material/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { CategorType } from './categories.model';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      imports: [MaterialModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have categories defined', () => {
    expect(component.categories).toBeDefined();
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should render category cards', () => {
    const categoryCards =
      fixture.nativeElement.querySelectorAll('.category-card');
    expect(categoryCards.length).toEqual(component.categories.length);
  });

  it('should navigate to the correct route when "Shop Now" button is clicked', fakeAsync(() => {
    spyOn(router, 'navigate').and.stub();

    const categoryTypeToShopNow: CategorType = CategorType.Electronics;

    component.shopNow(categoryTypeToShopNow);

    tick();

    expect(router.navigate).toHaveBeenCalledWith([categoryTypeToShopNow]);
  }));
});
