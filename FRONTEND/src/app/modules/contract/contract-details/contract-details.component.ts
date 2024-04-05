import { ContractService } from "./../../../core/services/Contract.service";
import {
  Component,
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
import { CarModalComponent } from "../../cars/car-modal/car-modal.component";
import { switchMap } from "rxjs";

@Component({
  selector: "app-contract-details",
  templateUrl: "./contract-details.component.html",
  styleUrls: ["./contract-details.component.scss"],
})
export class ContractDetailsComponent implements OnInit {
  public ContractData: any;

  formData = [];

  modal: ModalComponent;

  ContractForm: FormGroup;
  carData = [];

  inputsValue: string[] = Array(25).fill("");

  ngOnInit(): void {
    this.loadData();
    this.fetchAllCars();
  }

  constructor(
    private router: Router,
    private carService: CarService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private readonly contractService: ContractService,
    private toastr: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.modal = new ModalComponent(config, modalService);
    this.initForm(formBuilder);
  }

  etatForm = true;
  buttonAdd = "add new contract";

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
      serial: [null], // No need for validators as it's optional
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
      no_km_out: [""],
      fuel_back: ["", Validators.required],
      no_km_back: ["", Validators.required],
      features: [[]],
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

  Contract: any;
  newContract: Contract;

  getContract(ContractId: number) {
    //current Contract:
    return this.contractService.get(ContractId).subscribe((res) => {
      this.Contract = res;
      console.log(res);
    });
  }

  updateContract(ContractId: number) {
    let newContract = {};
    this.contractService
      .get(ContractId)
      .pipe(
        switchMap((res: Contract) => {
          console.log("res",res);

          newContract = {
            serial: this.inputsValue[0] || res.serial,
            version: this.inputsValue[1] || res.version,

            sponsor: this.inputsValue[2] || res.sponsor,
            car_out: this.inputsValue[3] || res.car_out,
            days: this.inputsValue[4] || res.days,
            car_back: this.inputsValue[5] || res.car_back,

            car: this.inputsValue[6] || res.car,

            select_one: this.inputsValue[7] || res.select_one,
            location: this.inputsValue[8] || res.location,

         //   deposit: this.inputsValue[8] || res.deposit,
            hirer: this.inputsValue[10] || res.hirer,
            comments: this.inputsValue[11] || res.comments,
            daily: this.inputsValue[12] || res.daily,
            weekly: this.inputsValue[13] || res.weekly,
            monthly: this.inputsValue[14] || res.monthly,
            annual: this.inputsValue[15] ||res.annual,
            fuel_out: this.inputsValue[16] || res.fuel_out,
            no_km_out: this.inputsValue[17] || res.no_km_out,
            fuel_back: this.inputsValue[18] || res.fuel_back,
            no_km_back: this.inputsValue[19] || res.no_km_back,
            // features: this.inputsValue[20]
            //   ? this.inputsValue[19].split(",")
            //   : res.features,
            daily_val1: this.inputsValue[21] ||res.daily_val1,
             
            daily_val2: this.inputsValue[22]
              || res.daily_val2,
            daily_result: this.inputsValue[23]
              
              || res.daily_result,
            sum: this.inputsValue[24]
              || res.sum,
            discount: this.inputsValue[25]
              || res.discount,
            advance: this.inputsValue[26]
              ||  res.advance,
            payable: this.inputsValue[27]
              || res.payable,
          };

          console.log("hiiiiiiiii", newContract);
          return this.contractService.update(ContractId, newContract);
        })
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.toastr.showSuccess("Contract updated successfully");
          } else {
            this.toastr.showError("Error in updating the Contract details");
          }
        },
        (err) => {
          console.log(err);
          this.toastr.showError("Error in updating the Contract details");
        }
      );

    console.log("newcontract", this.newContract);
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

  chossedCar: Car;

  chooseCar(carItem: Car) {
    this.chossedCar = carItem;

    const dataCar = carItem.car + " " + carItem.year + " " + carItem.plate;
    console.log("car data", dataCar);
    this.ContractForm.controls["car"].setValue(dataCar);
  }

  fetchAllCars() {
    this.carService.getCars();

    this.carService.cars$.subscribe((res) => {
      this.carData = res;
    });
  }
  loadData() {
    this.contractService.getContracts();
    this.contractService.contracts$.subscribe((res) => {
      this.formData = res;

      console.log(this.formData);
    });
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

  getConfirmationValue(value: any, ContractId: number) {
    if (value == "Yes") {
      this.deleteContract(ContractId);
      console.log("first");
    }
  }

  open() {
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

  openCarModal() {
    const modalRef = this.modalService.open(CarModalComponent);
    modalRef.componentInstance.carData = this.carData;

    modalRef.componentInstance.carSelected.subscribe((selectedCar: Car) => {
      console.log("Selected car:", selectedCar);
      this.ContractForm.controls["car"].setValue(
        selectedCar.car + " " + selectedCar.year + " " + selectedCar.plate
      );
    });
  }
}
