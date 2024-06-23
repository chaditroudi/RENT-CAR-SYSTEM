import { Customer } from "../../../core/models/customer.model";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  NgbModal,
  NgbModalConfig,
  NgbNavChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { ContractService } from "src/app/core/services/contract.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { CarModalComponent } from "../../cars/car-modal/car-modal.component";
import { Car } from "src/app/core/models/car.model";
import { CarService } from "src/app/core/services/car.service";
import { CustomerModalComponent } from "../../customers/customer-modal/customer-modal.component";
import { CustomerService } from "src/app/core/services/customer.service";
import { Report } from "src/app/core/models";
import { ReportService } from "src/app/core/services/report.service";
import { Observable, combineLatest } from "rxjs";
import { DatePipe } from "@angular/common";
import { StorageService } from "src/app/core/services/storage.service";

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

  @Input()
  customerInfo = [];

  customerData = [];
  contractForm: FormGroup;

  public active1 = 1;
  public active2 = 1;
  public active3 = 1;
  public active4 = 1;
  disabled = true;

  reportData: Report;

  car_id: any;
  customer_id: any;
  constructor(
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastr: ToastService,
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private carService: CarService,
    private customerService: CustomerService,
    private reportService: ReportService,
    private storageService: StorageService
  ) {
    this.initForm(formBuilder);
    this.modal = new ModalComponent(config, modalService);
  }

  autoInc = 0;
  getAutoInc() {
    this.contractService.getAutoInc().subscribe((res) => {
      this.autoInc = res;
    });
  }

  combineLatestDateAndDays(): Observable<[Date, number]> {
    return combineLatest([
      this.contractForm.get("car_out").valueChanges,
      this.contractForm.get("days").valueChanges,
    ]);
  }

  addDays(date: Date, days: number): Date {
    const copy = new Date(date.getTime());
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  ngOnInit(): void {
    this.getAutoInc();
    this.fetchAllCustomers();
    this.fetchAllCars();
    // this.loadData();

    this.contractForm.valueChanges.subscribe(() => {
      this.calculateReturnDate();
    });
  }

  async fetchAllCars() {
    if (this.storageService.getRole() == 1) {
      this.carService.getCars();

      this.carService.cars$.subscribe((res: Car[]) => {
     
        this.carData = res.filter(car => !car.rented);
      });
    } else if (
      this.storageService.getRole() == 2 ||
      this.storageService.getRole() == 3
      ) {
      this.carService.getCarsByBranch();
      this.carService.cars$.subscribe((res) => {
        this.carData = res.filter(car => !car.rented);
      });
    }
  }

  calculateReturnDate() {
    const checkOutDate = this.contractForm.get("car_out").value;
    const numberOfDays = this.contractForm.get("days").value;

    if (checkOutDate && numberOfDays) {
      const checkOutDateTime = new Date(checkOutDate).getTime();
      const returnDateTime =
        checkOutDateTime + numberOfDays * 24 * 60 * 60 * 1000;
      const returnDate = new Date(returnDateTime);
      const formattedDate = returnDate.toISOString().split("T")[0];
      const formattedTime = returnDate.toTimeString().split(" ")[0];
      const formattedDateTime = `${formattedDate}T${formattedTime}`;

      this.contractForm.patchValue(
        { car_back: formattedDateTime },
        { emitEvent: false }
      );
    }
  }

  //Local Variable defined
  formattedaddress = " ";
  options = {};
  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address;
  }

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
      version: [1, Validators.required],
      sponsor: ["", Validators.required],
      car_out: [null],
      car_back: [null],
      select_one: ["", Validators.required],
      deposit: ["", Validators.required],
      location: ["", Validators.required],
      owner: ["", Validators.required],
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

  async createContract() {
    this.contractForm.controls["car"].setValue(this.car_id);
    this.contractForm.controls["owner"].setValue(this.customer_id);
    this.contractForm.controls["location"].setValue(this.formattedaddress);
    this.contractService.create(this.contractForm.value).subscribe(
      async (response: any) => {
        if (response.rented == true) {
          this.toastr.showError("Car is already rented");

          this.contractForm.controls["car"];
          this.contractForm.controls["owner"];
        }

        this.reportData = {
          car: this.car_id,
          contract: response.data._id,
        };

        await this.reportService.createReport(this.reportData).toPromise();
        this.contractForm.reset({
          car: this.car_id,
          owner: this.customer_id,
        });

        this.toastr.showSuccess("Contract added successfully");
        this.router.navigate(["/modules/contracts/contract/contract-details"]);
      },
      (err) => {
        this.toastr.showError("Error in adding the Contract details");
      }
    );
  }

  openCarModal() {
    const modalRef = this.modalService.open(CarModalComponent);
    modalRef.componentInstance.carData = this.carData;
    modalRef.componentInstance.carData;

    modalRef.componentInstance.carSelected.subscribe((selectedCar: Car) => {
      this.contractForm.controls["car"].setValue(
        selectedCar.car + " " + selectedCar.year + " " + selectedCar.plate
      );

      this.contractForm.controls["daily"].setValue(selectedCar.daily);

      this.contractForm.controls["weekly"].setValue(selectedCar.weekly);

      this.contractForm.controls["monthly"].setValue(selectedCar.monthly);

      this.contractForm.controls["annual"].setValue(selectedCar.annual);
      this.car_id = selectedCar._id;
    });
  }

  fetchAllCustomers() {
    
    if(JSON.parse(this.storageService.getCurrentUser()).data.role === 1) {
      this.customerService.fetchAllCustomers();
    this.customerService.customers$.subscribe((res) => {
      this.customerData = res;
    });

    // this.carService.cars$.subscribe((res) => {
    //   this.carData = res;
    // });
    }else {
      this.customerService.fetchAllCustomersByBranch();
    this.customerService.customers$.subscribe((res) => {
      this.customerData = res;
    });

    // this.carService.cars$.subscribe((res) => {
    //   this.carData = res;
    // });
    }
  }

  fullname = "";
  selectedCust: Customer;

  showDetailsHirer: boolean = false;
  openCustomerModal() {
    // this.openSearchModal();
    const modalRef = this.modalService.open(CustomerModalComponent, {
      size: "xl",
    });
    modalRef.componentInstance.customerData = this.customerData;

    modalRef.componentInstance.customerSelected.subscribe(
      (selectedCust: Customer) => {
        this.contractForm.controls["owner"].setValue(
          selectedCust.fullName +
            " " +
            selectedCust.mobile +
            " " +
            selectedCust.QAR_address
        );
        this.fullname = selectedCust.fullName;

        this.selectedCust = {
          _id: selectedCust._id,
          fullName: selectedCust.fullName,
          mobile: selectedCust.mobile,
          QAR_address: selectedCust.QAR_address,
          email: selectedCust.email,
          passport_number: selectedCust.passport_number,
          id_number: selectedCust.id_number,
          title: selectedCust.title,
          date_birth: selectedCust.date_birth,
          license_number: selectedCust.license_number,
          code: selectedCust.code,
          issued_by: selectedCust.issued_by,
          issued_on: selectedCust.issued_on,
          expiry_date: selectedCust.expiry_date,
          passport_expiry: selectedCust.passport_expiry,
          operation_balance: selectedCust.operation_balance,
          nationality: selectedCust.nationality,
          permanent_address: selectedCust.permanent_address,
          person_name: selectedCust.person_name,
          home_country: selectedCust.home_country,
        };

        this.customer_id = selectedCust._id;

        this.showDetailsHirer = true;
      }
    );
  }

  // PAYMENTS:
  onChangePaymentDays(event) {
    let days = this.contractForm.controls["days"].value;
    this.contractForm.controls["daily_val1"].setValue(days);
  }
}
