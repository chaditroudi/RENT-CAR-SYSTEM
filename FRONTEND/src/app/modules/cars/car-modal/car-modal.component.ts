import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.scss'],
})
export class CarModalComponent implements OnInit {

  @Input() carData: any[];
   carInfo: any[];
  @Output() carSelected = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.carInfo = this.carData;
  }

  

  
  chooseCar(car: any) {
    this.carSelected.emit(car);
    this.activeModal.close();
  }



}
