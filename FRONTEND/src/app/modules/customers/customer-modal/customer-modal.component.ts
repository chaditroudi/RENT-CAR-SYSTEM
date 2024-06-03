import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
})
export class CustomerModalComponent implements OnInit , OnDestroy{

  @Input() customerData: any[];
   customerInfo: any[];
  @Output() customerSelected = new EventEmitter<any>();
  searchQuery: string = "";

  constructor(public activeModal: NgbActiveModal) {
  }
  ngOnDestroy() {} 

  ngOnInit(): void {
    this.customerInfo = this.customerData;
  }

  

  
  chooseCustomer(car: any) {
    this.customerSelected.emit(car);
    this.activeModal.close();
  }



}
