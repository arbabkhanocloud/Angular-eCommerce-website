import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial empty search text', () => {
    service.searchText$.subscribe((searchText) => {
      expect(searchText).toBe('');
    });
  });

  it('should update search text correctly', () => {
    const testText = 'Test Search Text';

    service.updateSearchText(testText);

    service.searchText$.subscribe((searchText) => {
      expect(searchText).toBe(testText);
    });
  });

  it('should handle multiple updates correctly', () => {
    const testText1 = 'Test Search Text 1';
    const testText2 = 'Test Search Text 2';

    service.updateSearchText(testText1);
    service.updateSearchText(testText2);

    service.searchText$.subscribe((searchText) => {
      expect(searchText).toBe(testText2);
    });
  });
});
