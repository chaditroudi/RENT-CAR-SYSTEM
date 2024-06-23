import { StatisticsService } from './../../../core/services/statistics.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';
import { ContractService } from 'src/app/core/services/contract.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {



  openContractCount:number = 0;
  closedContractCount:number = 0;
  countRented:number = 0;
  countAva:number = 0;
  validInss: Car[];
  validRegist: Car[];

  role:number;
  



  getCarsWithValidInsurance(): void {
    console.log(JSON.parse(this.storageServ.getCurrentUser()));
    this.carService.getCarsWithValidInsurance(JSON.parse(this.storageServ.getCurrentUser()).branch_id).subscribe(data => {
      this.validInss = data;
    });
  }

  getCarsWithValidRegistration(): void {
    this.carService.getCarsWithValidRegistration(JSON.parse(this.storageServ.getCurrentUser()).branch_id).subscribe(data => {
      this.validRegist = data;
    });
  }
  async countContractOpen() {
    this.statisService.countContractOpen().subscribe((data)=>{

      console.log(data)
      this.openContractCount = data;

    })
  }

  countRentedCar() {
    this.statisService.countRentedCar().subscribe((data)=>{ 
        this.countRented = data;
    });
  }

  countAvailableCar() {

    this.statisService.countAvailableCar().subscribe((data)=>{
      console.log(data);
      this.countAva = data;
    });
  }

  countContractClosed() {
    this.statisService.countContractClosed().subscribe((data)=>{

      this.closedContractCount = data;

    })

  }
  ngOnInit() {
    this.countContractOpen();
    this.countAvailableCar();
    this.countRentedCar();
    this.countContractClosed();
    this.getCarsWithValidInsurance();
    this.getCarsWithValidRegistration();
    this.role = this.storageServ.getRole();
   
  }



  constructor(private statisService:StatisticsService,private readonly carService:CarService,private storageServ:StorageService){
    
  }





    
   
}
