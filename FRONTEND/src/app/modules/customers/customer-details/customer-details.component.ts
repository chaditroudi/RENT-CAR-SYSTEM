import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  @Input() customer: any; 


  

  constructor(public activeModel:NgbActiveModal) {

  }

  closeModal() {
    this.activeModel.close();
  }

}
