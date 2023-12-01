import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { MaterialModule } from '../material/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from 'src/app/services/search/search.service';

import { CategoriesComponent } from './categories.component';
import { CategorType } from './categories.model';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let router: Router;
  let searchService: jasmine.SpyObj<SearchService>;

  beforeEach(() => {
    const searchServiceSpy = jasmine.createSpyObj('SearchService', [
      'searchText$',
      'updateSearchText',
    ]);

    TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      imports: [MaterialModule, RouterTestingModule],
      providers: [{ provide: SearchService, useValue: searchServiceSpy }],
    });
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    searchService = TestBed.inject(
      SearchService,
    ) as jasmine.SpyObj<SearchService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have categories defined', () => {
    expect(component.categories).toBeDefined();
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should render category cards', () => {
    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();
    fixture.detectChanges();
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

  it('it should update categories listing when input update or change', () => {
    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();
    fixture.detectChanges();

    const productElement = fixture.nativeElement.querySelectorAll('mat-card');
    expect(productElement.length).toEqual(5);

    const newSearchText = 'cloth';
    searchTextSubject.next(newSearchText);

    fixture.detectChanges();

    const productElemen2 = fixture.nativeElement.querySelectorAll('mat-card');
    expect(productElemen2.length).toEqual(1);
  });

  it('should update filtered categories when searchText$ emits a new value', () => {
    spyOn(component, 'onSearchChange').and.callThrough();

    const searchTextSubject = new BehaviorSubject<string>('');
    searchService.searchText$ = searchTextSubject.asObservable();

    component.ngOnInit();

    const newSearchText = 'cloth';
    searchTextSubject.next(newSearchText);

    expect(component.onSearchChange).toHaveBeenCalledWith(newSearchText);
    expect(component.filteredCategories.length).toEqual(1);

    fixture.detectChanges();

    const productElement = fixture.nativeElement.querySelectorAll('mat-card');
    expect(productElement.length).toEqual(1);
  });
});
