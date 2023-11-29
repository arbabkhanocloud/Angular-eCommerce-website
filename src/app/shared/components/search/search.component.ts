import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchText = '';
  private searchTimeout: any;

  constructor(private readonly searchServce: SearchService) {}

  filter() {
    this.searchServce.updateSearchText(this.searchText);
  }

  onSearchTextChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.filter();
    }, 400);
  }
}
