import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [AppModule],
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create search component instance', () => {
    expect(component).toBeTruthy();
  });

  it('initial searchText string should be empty', () => {
    expect(component.searchText).toEqual('');
  });

  it('should update the searchText string immediately when input is typed', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.searchText).toEqual('test');
  });

  it('should call filter function on button click', () => {
    spyOn(component, 'filter');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.filter).toHaveBeenCalled();
  });

  it('should call filter method when Enter key is pressed', () => {
    spyOn(component, 'filter');
    const inputElement =
      fixture.debugElement.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(event);
    expect(component.filter).toHaveBeenCalled();
  });
});
