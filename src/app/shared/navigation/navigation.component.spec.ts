import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { AppModule } from 'src/app/app.module';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [AppModule],
    });
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when logo is clicked', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    const logo = fixture.debugElement.nativeElement.querySelector('.logo');
    logo.click();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should navigate to home when Categories is clicked', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    const catergories =
      fixture.debugElement.nativeElement.querySelector('.categories');
    catergories.click();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should navigate to cart when cart icon is clicked', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    const cartIcon =
      fixture.debugElement.nativeElement.querySelector('.cart-icon');
    cartIcon.click();
    expect(navigateSpy).toHaveBeenCalledWith(['cart']);
  });

  it('should navigate to login when user status is clicked', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    const userStatus =
      fixture.debugElement.nativeElement.querySelector('.user-status');
    userStatus.click();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('should show app-search when the route is not /cart', () => {
    component.showSearchBar = true;
    fixture.detectChanges();

    const appSearch =
      fixture.debugElement.nativeElement.querySelector('app-search');
    expect(appSearch).toBeTruthy();
  });

  it('should hide app-search when the route is /cart', () => {
    component.showSearchBar = false;
    fixture.detectChanges();

    const appSearch =
      fixture.debugElement.nativeElement.querySelector('app-search');

    expect(appSearch).toBeFalsy();
  });
});
