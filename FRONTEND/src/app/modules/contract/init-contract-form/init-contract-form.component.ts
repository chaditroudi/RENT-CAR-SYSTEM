import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  NgbModal,
  NgbModalConfig,
  NgbNavChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { ContractService } from "src/app/core/services/Contract.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { CarModalComponent } from "../../cars/car-modal/car-modal.component";
import { Car } from "src/app/core/models/car.model";
import { CarService } from "src/app/core/services/car.service";

@Component({
  selector: "app-init-contract-form",
  templateUrl: "./init-contract-form.component.html",
  styleUrls: ["./init-contract-form.component.scss"],
})
export class InitContractFormComponent implements OnInit {
  modal: ModalComponent;
  carData = [];
  @Input()
  carInfo = [];

  contractForm: FormGroup;
  constructor(
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastr: ToastService,
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private carService:CarService
  ) {
    this.initForm(formBuilder);
    this.modal = new ModalComponent(config, modalService);
  }

  loadData() {
    this.carService.getCars();
    this.carService.cars$.subscribe((res) => {
      this.carData = res;

      console.log(this.carData);
    });
  }


  ngOnInit(): void {
    this.loadData();
  }

  public active1 = 1;
  public active2 = 1;
  public active3 = 1;
  public active4 = 1;
  disabled = true;

  onNavChange1(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      changeEvent.preventDefault();
    }
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  goToHirer() {
    this.router.navigate(["/modules/customers/customers-list"]);
  }

  initForm(formBuilder: FormBuilder) {
    this.contractForm = formBuilder.group({
      car: ["", Validators.required],
      version: [null, Validators.required],
      sponsor: ["", Validators.required],
      car_out: [null],
      car_back: [null],
      select_one: ["", Validators.required],
      deposit: ["", Validators.required],
      location: ["", Validators.required],
      hirer: ["", Validators.required],
      comments: [""],
      daily: [null],
      days: [null],
      monthly: [null],
      weekly: [null],
      annual: [null],
      fuel_out: [""],
      carData: [""],
      no_km_out: [""],
      fuel_back: ["", Validators.required],
      no_km_back: ["", Validators.required],
      // features: [[]],
      daily_val1: [null],
      daily_val2: [null],
      daily_result: [null],
      sum: [null],
      discount: [null],
      advance: [null],
      payable: [null],
    });
  }

  createContract() {
    console.log(this.contractForm.value);
    this.contractService.create(this.contractForm.value).subscribe(
      (response) => {
        console.log(response);

        if (this.contractForm.valid) {
          this.toastr.showSuccess("Contract added successfully");
        }
        if (response) {
        } else {
          this.toastr.showError("Error in adding the Contract details");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openCarModal() {
    const modalRef = this.modalService.open(CarModalComponent);
    modalRef.componentInstance.carData = this.carData;
    console.log(modalRef.componentInstance.carData);

    modalRef.componentInstance.carSelected.subscribe((selectedCar: Car) => {
      console.log("Selected car:", selectedCar);
      this.contractForm.controls["car"].setValue(
        selectedCar.car + " " + selectedCar.year + " " + selectedCar.plate
      );
    });
  }
}
