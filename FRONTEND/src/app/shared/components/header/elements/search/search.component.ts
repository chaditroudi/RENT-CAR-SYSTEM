import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  searchQuery: string = '';

  constructor() {
    // Set the initial value of searchQuery
  }

  onSearchChange() {
    this.searchChange.emit(this.searchQuery.trim());
  }
}
