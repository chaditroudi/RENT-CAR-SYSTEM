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
  validInss: Car[];
  validRegist: Car[];

  role:number;
  



  getCarsWithValidInsurance(): void {
    this.carService.getCarsWithValidInsurance(JSON.parse(this.storageServ.getCurrentUser()).branch_id).subscribe(data => {
      this.validInss = data;
    });
  }

  getCarsWithValidRegistration(): void {
    this.carService.getCarsWithValidRegistration(JSON.parse(this.storageServ.getCurrentUser()).branch_id).subscribe(data => {
      this.validRegist = data;
    });
  }
  countContractOpen() {
    this.statisService.countContractOpen().subscribe((data)=>{

      this.openContractCount = data;

    })
  }

  countContractClosed() {
    this.statisService.countContractClosed().subscribe((data)=>{

      this.closedContractCount = data;

    })

  }
  ngOnInit() {
    this.countContractOpen();
    this.countContractClosed();
    this.getCarsWithValidInsurance();
    this.getCarsWithValidRegistration();
    this.role = this.storageServ.getRole();
   
  }



  constructor(private statisService:StatisticsService,private readonly carService:CarService,private storageServ:StorageService){
    
  }





    
   
}
