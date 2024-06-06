import { LoadingService } from './../../../shared/services/loading.service';
import { CarService } from "./../../../core/services/car.service";
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";
import { ConfirmationModalComponent } from "src/app/shared/components/confirmation-modal/confirmation-modal.component";
import { Car } from "src/app/core/models/car.model";
import { switchMap } from "rxjs";
import { StorageService } from "src/app/core/services/storage.service";

@Component({
  selector: "app-car-details",
  templateUrl: "./car-details.component.html",
  styleUrls: ["./car-details.component.scss"],
})
export class CarDetailsComponent implements OnInit, OnChanges {
  public carData: any;

  formData = [];
  filteredData=[];
  currentPage: number = 1;
  pageSize: number = 10;
  paginationId: string = 'carPagination';

  modal: ModalComponent;

  carForm: FormGroup;
  inputsValue: string[] = Array(30).fill("");


  loading: boolean = false;


  ngOnInit(): void {
    this.loadData();


  }

  constructor(
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private readonly carService: CarService,
    private toastr: ToastService,
    private formBuilder: FormBuilder,
    private storageService:StorageService
    ,
    private loadingService:LoadingService
  ) {
    this.modal = new ModalComponent(config, modalService);

    this.carForm = formBuilder.group({
      car: ["", Validators.required],
      code: ["", Validators.required],
      plate: ["", Validators.required],
      year: ["", Validators.required],
      daily: [""],
      weekly: [""],
      monthly: [""],
      annual: [""],
      comments: [""],
      current: [""],
      next_service: [""],
      insurance: [""],
      registration: [""],
      engine_no: [""],
      chassis_no: [""],
      fuel: [""],
      petrol_charge: [""],
      color: [""],
      category: [""],
      origin: [""],
      doors: [""],
      seats: [""],
      cylinders: [""],
      insurance_company: [""],
      type_of_insurance: [""],
      owner_name: [""],
      owner_id: [""],
      nationality: [""],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  createCar() {
    this.carService.create(this.carForm.value).subscribe(
      (response) => {
        (response);

        if (this.carForm.valid) {
          this.toastr.showSuccess("car added successfully");
        }
        if (response) {
        } else {
          this.toastr.showError("Error in adding the car details");
        }
      },
      (err) => {
        (err);
      }
    );
  }

  onChangeInputValue(event: Event, index: number) {
    const target = event.target as HTMLInputElement;

    this.inputsValue[index] = target.value;

    (
      `inputValue: ${index + 1}  changed to : ${this.inputsValue[index]}`
    );
  }

  car: any;

  getCar(carId: number) {
    //current car:
    return this.carService.get(carId).subscribe((res) => {
      this.car = res;
      (res);
    });
  }
  updateCar(carId: number) {
    let newCar = {};
  
    this.carService.get(carId).pipe(
      switchMap((res: Car) => {
        this.car = res;
        newCar = {
          code: this.inputsValue[0] ? this.inputsValue[0] : res.code,
          car: this.inputsValue[1] || res.car,
          year: this.inputsValue[2] || res.year,
          plate: parseInt(this.inputsValue[3]) || res.plate,
          daily: this.inputsValue[4] || res.daily,
          weekly: this.inputsValue[5] || res.weekly,
          monthly: this.inputsValue[6] || res.monthly,
          annual: this.inputsValue[7] || res.annual,
          current: this.inputsValue[30] || res.current,
          next_service: this.inputsValue[9] || res.next_service,
          insurance: this.inputsValue[10] || res.insurance,
          registration: this.inputsValue[11] || res.registration,
          engine_no: this.inputsValue[12] || res.engine_no,
          chassis_no: this.inputsValue[13] || res.chassis_no,
          fuel: this.inputsValue[14] || res.fuel,
          petrolCharge: this.inputsValue[15] || res.petrol_charge,
          color:this.inputsValue[17] || res.color,
          category: this.inputsValue[18] || res.category,
          origin: this.inputsValue[19] || res.origin,
          doors: this.inputsValue[20] || res.doors,
          seats:this.inputsValue[21] || res.seats,
          cylinders: this.inputsValue[22] || res.cylinders,
          insurance_company: this.inputsValue[23] || res.insurance_company,
          type_of_insurance:this.inputsValue[24] || res.type_of_insurance,
          owner_name:this.inputsValue[25] ||res.owner_name,
          owner_id:this.inputsValue[26] ||res.owner_id,
          nationality:this.inputsValue[27] || res.nationality

        };
  
        return this.carService.update(carId, newCar);
      })
    ).subscribe(
      (response) => {
        (response);
        if (response) {
          // const index = this.formData.findIndex((car: Car) => parseInt(car._id) === carId);
          // if (index !== -1) {
          //   this.formData[index] = { ...this.formData[index], ...newCar };
          // }
          this.loadData();
          this.toastr.showSuccess("Car updated successfully");
        } else {
          this.toastr.showError("Error in updating the car details");
        }
      },
      (err) => {
        (err);
      }
    );


  }

  

  deleteCar(carId: number): void {

  
    this.carService.delete(carId).subscribe(
      () => {
        this.loadData();
        this.toastr.showSuccess("Car deleted successfully");
      },
      (err) => {
        console.error(err);
        this.toastr.showError("Error in deleting the car");
      }
    );
  
  }
  // loadData() {
  //   this.carService.getCars();

  //   this.carService.cars$.subscribe((res) => {
  //     this.carData = res;

  //     this.formData = this.carData;

  //     this.filteredData = [...this.formData]

  //   });
  // }
  loadData() {
    this.loading = true;

    if(this.storageService.getRole() == 1) {
      this.carService.getCars();

      this.carService.cars$.subscribe((res) => {
        this.carData = res;
  
        this.formData = this.carData;
  
        this.filteredData = [...this.formData]
        this.loading = false;
      this.loadingService.hide();
  
      });
    }
    else if(this.storageService.getRole() == 2 || this.storageService.getRole() == 3) {

      this.carService.getCarsByBranch();

      this.carService.cars$.subscribe((res) => {
        this.carData = res;

  
        this.formData = this.carData;
  
        this.filteredData = [...this.formData]
        this.loading = false;
        this.loadingService.hide();
    
  
      });
    }
  
  }

  @ViewChild("confirmationModal")
  private modalComponent!: ConfirmationModalComponent;

  modalStyle: string = "modal-style-success";
  modalTitle: string = "Success Confirmation";
  modalBody: string = "This is a Success Confirmation message";
  modalButtonColor: string = "btn-success";

  async openModal() {
    return await this.modalComponent.open();
  }

  getConfirmationValue(value: any, carId: number) {
    if (value == "Yes") {
      this.deleteCar(carId);
      ("first");
    }
  }

  open() {
    this.openModal();
  }


  updateFilteredData(searchQuery: string) {
    
    if (searchQuery.trim() === '') {
      this.filteredData = this.formData; // If search query is empty, show all data
    } else {
    
      const searchTerms = searchQuery.trim().toLowerCase().split(' ');
      this.filteredData = this.formData.filter(car =>
     
        searchTerms.every(term =>
          Object.values(car).some(value =>
            value && value.toString().toLowerCase().includes(term)
          )
        )
        
      );   

    }
    this.currentPage = 1; 
  }

  pageChanged(event: number) {
    // Update current page when pagination changes
    this.currentPage = event;
  }





  onSearchChange(query: string) {
    this.filteredData = this.formData.filter(item =>
      item.car.toLowerCase().includes(query.toLowerCase()) ||  item.plate.toLowerCase().includes(query.toLowerCase())
    );


}




}
