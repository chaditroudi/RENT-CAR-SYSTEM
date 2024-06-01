// multi-select-dropdown.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Contract } from 'src/app/core/models/contract.model';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss']
})
export class MultiSelectDropdownComponent implements OnInit {

  @Input() list: any[];
  @Output() shareCheckedList = new EventEmitter<string[]>();
  @Output() shareCheckedListBack = new EventEmitter<string[]>();
  @Output() shareIndividualCheckedList = new EventEmitter<{ checked: boolean, label: string }>();

  @Input()
  currentData:any;
  selectedFeatures: any[] = [];

  checkedList: string[] = [];
  showDropDown = false;

  constructor() {

  }


  flattenFeatures(data: any[][]): any[] {
    // Flatten the array of arrays into a single array
    return data.reduce((acc, features) => acc.concat(features), []);
  }

  ngOnInit() {

    this.selectedFeatures = this.flattenFeatures(this.currentData);



  }
  getSelectedValue(selectedItems: string[]) {
   
    // Emit the individual checked items
    selectedItems.forEach((item:any) => {
      const currentSelected ={
        label:item.label,
        checked:true
      };
      console.log(currentSelected)
      this.shareIndividualCheckedList.emit(currentSelected);
    });
     // Emit the updated checkedList
     this.checkedList = selectedItems;
     this.shareCheckedList.emit(this.checkedList);
 
  }
}

