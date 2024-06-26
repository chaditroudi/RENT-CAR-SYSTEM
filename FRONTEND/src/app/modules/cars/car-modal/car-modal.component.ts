import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/core/models/car.model';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.scss'],
})
export class CarModalComponent implements OnInit {

  @Input() carData: Car[];


   carInfo: Car[];
  @Output() carSelected = new EventEmitter<any>();
  notAva: boolean = false;
  rentedCars: Car[];

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {

    
    this.carInfo =this.carData
    console.log(this.carInfo)
  }

  

  
  chooseCar(car: any) {
    this.carSelected.emit(car);
    this.activeModal.close();
  }





}
