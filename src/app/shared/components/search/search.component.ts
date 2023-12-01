import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchText = '';
  private searchTimeout: any;

  searchSubscription!: Subscription;

  constructor(private readonly searchService: SearchService) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchService.searchText$.subscribe(
      (text) => {
        this.searchText = text;
      },
    );
  }

  filter() {
    this.searchService.updateSearchText(this.searchText);
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
