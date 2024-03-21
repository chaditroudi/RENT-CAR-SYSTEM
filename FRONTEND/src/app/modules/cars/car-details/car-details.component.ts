import { CarService } from './../../../core/services/car.service';
import { Component, OnInit } from "@angular/core";

import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: "app-car-details",
  templateUrl: "./car-details.component.html",
  styleUrls: ["./car-details.component.scss"],
})
export class CarDetailsComponent implements OnInit {
  
 public carData: any;
  
 totalPages:number;
 pageSize= 1;
 currentPage: number = 1;

 formData =[];

 modal :ModalComponent ;

 carForm:FormGroup;

  ngOnInit(): void {
    
    this.loadData();
  }

  constructor(
    private router:Router,
    config:NgbModalConfig
    ,private modalService: NgbModal
    ,private readonly carService:CarService,
    private toastr:ToastService,
    private formBuilder:FormBuilder) {
      this.modal = new ModalComponent(config,modalService);

    this.carForm =formBuilder.group({
      car:['',Validators.required],
      code:['',Validators.required],
      plate:['',Validators.required],
      year:['',Validators.required]
    });

  }

  //display cars:
 
  

// Create a new car :

 createCar() {
  this.carService.create(this.carForm.value).subscribe(
    response => {
      console.log(response);
      if(response){
        this.toastr.showSuccess("car added successfully");

        // this.router.navigate([('/modules/cars/cars-details')]);
      }else{
        this.toastr.showError("Error in adding the car details");
      }
    },err => {
      console.log(err);
    });

}










  previousPage() {
    if(this.currentPage> 0) {
      this.currentPage--;
      this.loadData();
    }
  }

  nextPage() {
    if(this.currentPage < this.totalPages  - 1) {
      this.currentPage++;
      this.loadData();
    }
  }


  loadData() {


    this.carService.getAll().subscribe(res => {
      this.carData = res;

    console.log(this.carData)


    this.totalPages = Math.ceil(this.carData.length / this.pageSize);  

    const start = this.currentPage * this.pageSize;
    console.log("START in")

    const end = Math.min(start +  this.pageSize, this.carData.length);

    this.formData = this.carData.slice(start, end);
  });

  }

}
