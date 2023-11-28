import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchText = '';
  private searchTimeout: any;
  @Output() searchChange = new EventEmitter<string>();

  filter() {
    this.searchChange.emit(this.searchText);
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
