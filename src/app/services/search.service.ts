import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTextSubject = new BehaviorSubject<string>('');
  searchText$: Observable<string> = this.searchTextSubject.asObservable();

  updateSearchText(text: string) {
    this.searchTextSubject.next(text);
  }
}
