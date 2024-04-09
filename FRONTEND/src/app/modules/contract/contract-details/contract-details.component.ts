import { ContractService } from "./../../../core/services/Contract.service";
import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import {
  NgbModalConfig,
  NgbModal,
  NgbNavChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";
import { ConfirmationModalComponent } from "src/app/shared/components/confirmation-modal/confirmation-modal.component";
import { Contract } from "src/app/core/models/contract.model";
import { CarService } from "src/app/core/services/car.service";
import { Car } from "src/app/core/models/car.model";
import { createUpdatedContract } from "src/app/core/models/contract-update.model";
import { CarModalComponent } from "../../cars/car-modal/car-modal.component";
import { switchMap } from "rxjs";
import { DateService } from "src/app/shared/services/date.service";
import { SearchComponent } from "src/app/shared/components/header/elements/search/search.component";
import { CustomerModalComponent } from "../../customers/customer-modal/customer-modal.component";
import { CustomerService } from "src/app/core/services/customer.service";
import { Customer } from "src/app/core/models/customer.model";

@Component({
  selector: "app-contract-details",
  templateUrl: "./contract-details.component.html",
  styleUrls: ["./contract-details.component.scss"],
})
export class ContractDetailsComponent implements OnChanges, OnInit {
  public ContractData: any;

  formData = [];

  dateBC: string;

  features = [];
  status = "Contract is Open";
  modal: ModalComponent;

  ContractForm: FormGroup;
  carData = [];
  customerData = [];
  inputsValue: string[] = Array(33).fill("");
  selectedCarData: string;
  selectedCustomerData: string;

  isDisabled: boolean = false;

  etatForm = true;
  buttonAdd = "add new contract";

  Contract: any;
  newContract: Contract;

  carObject: Car;
  chossedCar: Car;
  car_id: any;
  selectedRadioValue = "";

  checkboxItems = [
    { id: "chk-ani", label: "Spare wheel", checked: false },
    { id: "chk-ani1", label: "Wheel cover", checked: false },
    { id: "chk-ani2", label: "Tools & Jack", checked: false },
    { id: "chk-ani3", label: "Radio / Tape", checked: false },
    { id: "chk-ani4", label: "Fire Extinguisher", checked: false },
    { id: "chk-ani5", label: "First AID box", checked: false },
    { id: "chk-ani6", label: "Lights", checked: false },
    { id: "chk-ani7", label: "GPS", checked: false },
    { id: "chk-ani8", label: "Heater / AC", checked: false },
    { id: "chk-ani9", label: "Fuel panel", checked: false },
  ];
  selectedItems: string[] = [];

  onCheckboxChange() {
    this.selectedItems = this.checkboxItems
      .filter((item) => item.checked)
      .map((item) => item.label);

    console.log(this.selectedItems);
  }

  onCarBackEvent(checked) {
    this.isDisabled = checked;

    if (this.isDisabled) {
      this.status = "Contract is Closed";
    } else {
      this.status = "Contract is Open";
    }
  }

  ngOnInit(): void {
    this.loadData();
    this.fetchAllCustomers();
    this.fetchAllCars();
  }
  ngOnChanges(): void {
    this.loadData();
    this.fetchAllCustomers();
    this.fetchAllCars();
  }

  constructor(
    private router: Router,
    private carService: CarService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private readonly contractService: ContractService,
    private toastr: ToastService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private dateService: DateService
  ) {
    this.modal = new ModalComponent(config, modalService);
    this.initForm(formBuilder);
  }

  openSearchModal() {
    const modalRef = this.modalService.open(SearchComponent);
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  resetForm() {
    if (this.etatForm) {
      this.formData = [];
      this.buttonAdd = "cancel";
      this.etatForm = false;
      return this.ContractForm.reset();
    } else {
      this.buttonAdd = "add new contract";
      this.loadData();

      this.etatForm = true;
      return this.ContractForm.reset();
    }
  }

  initForm(formBuilder: FormBuilder) {
    this.ContractForm = formBuilder.group({
      serial: [null],
      version: [null, Validators.required],
      sponsor: ["", Validators.required],
      car: [""],
      car_out: [null],
      car_back: [null],
      select_one: ["", Validators.required],
      deposit: ["", Validators.required],
      location: ["", Validators.required],
      hirer: ["", Validators.required],
      comments: [""],
      daily: [null],
      monthly: [null],
      weekly: [null],
      annual: [null],
      fuel_out: [""],
      days: [""],
      no_km_out: [""],
      fuel_back: ["", Validators.required],
      no_km_back: ["", Validators.required],
      daily_val1: [null],
      daily_val2: [null],
      daily_result: [null],
      sum: [null],
      discount: [null],
      advance: [null],
      payable: [null],
    });
  }

  onChangeInputValue(event: Event, index: number) {
    const target = event.target as HTMLInputElement;

    this.inputsValue[index] = target.value;

    console.log(
      `inputValue: ${index + 1}  changed to : ${this.inputsValue[index]}`
    );
  }

  getContract(ContractId: number) {
    //current Contract:
    return this.contractService.get(ContractId).subscribe((res) => {
      this.Contract = res;
      console.log(res);
    });
  }

  updateContract(contractId: number) {
    this.contractService
      .get(contractId)
      .pipe(
        switchMap((res: Contract) => {
          const updatedContract = createUpdatedContract(
            this.inputsValue,
            this.selectedCar && this.selectedCar._id
              ? this.selectedCar._id
              : res.car,
            this.selectedCus && this.selectedCus._id
              ? this.selectedCus._id
              : res.owner,
            this.selectedItems,
            this.status,

            res
          );

          return this.contractService.update(contractId, updatedContract);
        })
      )
      .subscribe(
        (response) => {
          if (response) {
            this.toastr.showSuccess("Contract updated successfully");
          } else {
            this.toastr.showError("Error in updating the Contract details");
          }
        },
        (error) => {
          console.error("Error in updating the Contract details:", error);
          this.toastr.showError("Error in updating the Contract details");
        }
      );
  }

  deleteContract(ContractId: number): void {
    this.contractService.delete(ContractId).subscribe(
      () => {
        this.toastr.showSuccess("Contract deleted successfully");
      },
      (err) => {
        console.error(err);
        this.toastr.showError("Error in deleting the Contract");
      }
    );
  }

  async chooseCar(carItem: Car) {
    this.selectedCarData =
      this.selectedCar.car +
      " " +
      this.selectedCar.year +
      " " +
      this.selectedCar.plate;

    console.log("car id ", this.selectedCar._id);
  }

  async chooseCustomer(cus: Customer) {
    this.selectedCustomerData = cus.fullName + " " + cus.mobile;

    console.log("customerrrrrrr", this.selectedCustomerData);

    this.ContractForm.controls["owner"].setValue(this.selectedCustomerData);
  }

  async fetchAllCars() {
    this.carService.getCars();

    this.carService.cars$.subscribe((res) => {
      this.carData = res;
    });
  }
  async fetchAllCustomers() {
    this.customerService.fetchAllCustomers();
    this.customerService.customers$.subscribe((res) => {
      this.customerData = res;
    });

    this.carService.cars$.subscribe((res) => {
      this.carData = res;
    });
  }
  async loadData() {
    this.contractService.getContracts();
    this.contractService.contracts$.subscribe((res) => {
      this.formData = res;

      console.log(this.formData);
    });
    [];
  }

  amount: number = 0;
  price: number = 0;
  result: number = 0;
  advance: number = 0;
  payable: number = 0;
  discount: number = 0;

  async onChangeRadioValue(event: any, days, price) {
    let array = [];

    this.selectedRadioValue = event.target.value;

    let res = this.dateService.convertDaysToMWY(days, this.selectedRadioValue);

    if (this.selectedRadioValue == "daily") {
      this.amount = days;
      this.price = price;
    } else if (this.selectedRadioValue == "weekly") {
      this.amount = res;
      this.price = price;
    } else if (this.selectedRadioValue == "monthly") {
      console.log("res", res);

      this.amount = res;
 
      this.price = price;
    } else if (this.selectedRadioValue == "annual") {
      this.amount = res;
      this.price = price;
    }

    this.result = this.amount * this.price;
    this.payable = this.result - this.advance - this.discount;
  }

  @ViewChild("payable") inputpayable: ElementRef;
  @ViewChild("advance") inputadv: ElementRef;
  @ViewChild("discount") inputdis: ElementRef;
  @ViewChild("sum") inputsum: ElementRef;

  calculate() {
    if (this.inputsValue[26] == null || this.inputsValue[25] === null) {
      this.inputpayable.nativeElement.value = this.result;
    }
    this.inputpayable.nativeElement.value =
      this.result -
      this.inputadv.nativeElement.value -
      this.inputdis.nativeElement.value;

    this.inputsValue[27] = this.inputpayable.nativeElement.value;
    this.inputsValue[24] = this.inputsum.nativeElement.value;
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

  async getConfirmationValue(value: any, ContractId: number) {
    if (value == "Yes") {
      this.deleteContract(ContractId);
      console.log("first");
    }
  }

  async open() {
    this.openModal();
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

  selectedCar: Car;
  selectedCus: Customer;

  async openCarModal() {
    // this.openSearchModal();
    const modalRef = this.modalService.open(CarModalComponent);
    modalRef.componentInstance.carData = this.carData;

    modalRef.componentInstance.carSelected.subscribe((selectedCar: Car) => {
      console.log(selectedCar);
      this.selectedCar = selectedCar;
      this.chooseCar(this.selectedCar);
    });
  }
  async openCustomerModal() {
    // this.openSearchModal();
    const modalRef = this.modalService.open(CustomerModalComponent);
    modalRef.componentInstance.customerData = this.customerData;

    modalRef.componentInstance.customerSelected.subscribe(
      (selectedCust: Customer) => {
        this.selectedCus = selectedCust;
        this.chooseCustomer(this.selectedCus);
      }
    );
  }




  goToInvoice(id:string) {

    return this.router.navigate(["/modules/contracts/contract-invoice",id,this.price]);
  }
}
