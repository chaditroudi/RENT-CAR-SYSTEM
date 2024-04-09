import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
})
export class CustomerModalComponent implements OnInit {

  @Input() customerData: any[];
   customerInfo: any[];
  @Output() customerSelected = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.customerInfo = this.customerData;
  }

  

  
  chooseCustomer(car: any) {
    this.customerSelected.emit(car);
    this.activeModal.close();
  }



}
