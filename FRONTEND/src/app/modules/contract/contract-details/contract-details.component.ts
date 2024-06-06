import { ContractService } from "./../../../core/services/contract.service";
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
import { Contract, Features } from "src/app/core/models/contract.model";
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
import { Report } from "src/app/core/models";
import { NotificationService } from "src/app/core/services/notification.service";
import { StorageService } from "src/app/core/services/storage.service";

import { checkboxItems, checkboxItemsBack } from "./../../../data/features";
import { trace } from "console";

@Component({
  selector: "app-contract-details",
  templateUrl: "./contract-details.component.html",
  styleUrls: ["./contract-details.component.scss"],
})
export class ContractDetailsComponent implements OnChanges, OnInit {
  public ContractData: any;

  disabled = true;
  formData = [];

  dateBC: string;

  features = [];
  status = "Contract is Open";
  modal: ModalComponent;

  newMessage = "";
  messageList: string[] = [];
  ContractForm: FormGroup;
  carData = [];
  customerData = [];
  inputsValue: string[] = Array(33).fill("");
  selectedCarData: string;
  selectedCustomerData: string;

  isDisabled: boolean = false;

  showIconPdf: boolean = false;
  etatForm = true;
  buttonAdd = "add new contract";

  Contract: any;
  newContract: Contract;

  carObject: Car;
  chossedCar: Car;
  car_id: any;
  selectedRadioValue = "";
  status_contract: string;

  userId: string;
  daily = "";
  weekly = "";
  monthly = "";
  annual = "";
  daily_val1: any;
  daily_val2: any;
  daily_result: any;
  advance: any;
  payable: any;
  discount: any;
  sum: any;
  currentData: any[] = []; 

  currentPage: number = 1;
  selectedFeatures: any[];
  select: any;

  @ViewChild("confirmationModal")
  private modalComponent!: ConfirmationModalComponent;

  @ViewChild("editContractModal")
  private editContractModal!: ConfirmationModalComponent;

  @ViewChild("payable") inputpayable: ElementRef;
  @ViewChild("advance") inputadv: ElementRef;
  @ViewChild("discount") inputdis: ElementRef;
  @ViewChild("sum") inputsum: ElementRef;

  finalRes: number = 0;
  noEditAlertModal: boolean = true;
  selectedCar: Car;
  selectedCus: Customer;

  selectedItems: any[] = [];
  selectedItemsBackCar: any[] = [];

  enableEditIc:boolean = false;

  reportData: Report;
  selectedItemsBack: string[] = [];
  selectedFeatures2: any[];
  currentData1: { label: string; checked: boolean }[][];
  formattedaddress: any;

  show_pdf = false;
  checkVidange: boolean = false;

  onCarBackEvent(checked) {
    this.isDisabled = checked;

    if (this.isDisabled) {
      this.status = "Contract is Closed";
    } else {
      this.status = "Contract is Open";
    }
  }
  ngOnInit(): void {
    this.discount = 0;
    this.payable = 0;
    this.advance = 0;
    this.loadData();
    this.getCurrentData();

    this.fetchAllCustomers();
    this.fetchAllCars();
    this.ContractForm.valueChanges.subscribe(() => {
      this.calculateReturnDate();
    });
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
    private dateService: DateService,
    private notificationService: NotificationService,
    private storageService: StorageService
  ) {
    this.modal = new ModalComponent(config, modalService);
    this.initForm(formBuilder);
  }

  openSearchModal() {
    const modalRef = this.modalService.open(SearchComponent);
    modalRef.result.then(
      (result) => {
        result;
      },
      (reason) => {
        reason;
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
      owner: [null],
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
      daily_val1: [0],
      daily_val2: [0],
      daily_result: [0],
      sum: [0],
      discount: [0],
      advance: [0],
      payable: [0],
    });
  }

  onChangeInputValue(event: Event, index: number) {
    const target = event.target as HTMLInputElement;

    this.inputsValue[index] = target.value;



    console.log(
      `inputValue: ${index + 1}  changed to : ${this.inputsValue[index]}`
    );
  }

  calculateReturnDate() {
    const checkOutDate = this.ContractForm.get("car_out").value;
    const numberOfDays = this.ContractForm.get("days").value;

    if (checkOutDate && numberOfDays) {
      const checkOutDateTime = new Date(checkOutDate).getTime();
      const returnDateTime =
        checkOutDateTime + numberOfDays * 24 * 60 * 60 * 1000;
      const returnDate = new Date(returnDateTime);
      const formattedDate = returnDate.toISOString().split("T")[0];
      const formattedTime = returnDate.toTimeString().split(" ")[0];
      const formattedDateTime = `${formattedDate}T${formattedTime}`;

      this.ContractForm.patchValue(
        { car_back: formattedDateTime },
        { emitEvent: false }
      );
    }
  }
  getContract(ContractId: number) {
    //current Contract:
    return this.contractService.get(ContractId).subscribe((res) => {
      this.Contract = res;
      res;
    });
  }

  async editContractAlert(value: any, ContractId: number) {
    if (value == "Yes") {
      this.updateContract(ContractId);
    }
  }


  checkKM(contract: Contract) {
    let array = [];

    let km_out = parseInt(this.inputsValue[17]);
    let km_back = parseInt(this.inputsValue[19]);

    let start = 5000;
    let end = 50000;

    let inc = 5000;

    for (let i = start; i <= end; i += inc) {
      array.push(i);
    }

    if (array.indexOf(km_back) !== -1 || array.indexOf(km_out) !== -1) {
      return (this.checkVidange = true);
    } else return (this.checkVidange = false);
  }

  updateContract(contractId: number) {
    this.contractService
      .get(contractId)
      .pipe(
        switchMap((res: Contract) => {
          this.status_contract = this.selectedRadioValue;

          // if (this.checkKM(res) === true) {
          //   this.newMessage = "Contract updated by Editor";
          //   console.log("car",res.car,"okoko",this.selectedCar)
          //   this.sendMessage(

          //     this.selectedCar && this.selectedCar
          //     ? this.selectedCar
          //     : res.car

          //   );

          //   this.checkVidange = false;
          // }

        this.inputsValue[22] = this.ContractForm.controls['daily_val2'].value;
        this.inputsValue[21] = this.ContractForm.controls['daily_val1'].value;
        this.inputsValue[23] = this.ContractForm.controls['daily_result'].value;


          const updatedContract = createUpdatedContract(
            this.inputsValue,
            this.selectedCar && this.selectedCar._id
              ? this.selectedCar._id
              : res.car,
            this.selectedCus && this.selectedCus._id
              ? this.selectedCus._id
              : res.owner,
            this.selectedFeatures,
            this.selectedFeatures2,
            this.status,

            this.status_contract,

            res
          );

          return this.contractService.update(contractId, updatedContract);
        })
      )
      .subscribe(
        async (response) => {
          // if(response.attempts) {
          //   this.toastr.showError("You cannot update contract more than 2 times");
          //   return;

          // }
          if (response) {
            if(response.attempts){

              return this.toastr.showError("You cannot update contract more than 2 times");

            }

            if (response.rented == true) {
              return this.toastr.showError("Car already rented");
            } else {
              this.toastr.showSuccess("Contract updated successfully");

              this.loadData();
              return;
            }
          } else {
            this.toastr.showError("Error in updating the Contract details");
            return;
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
      (res) => {
        this.loadData();
        this.toastr.showSuccess("Contract deleted successfully");
      },
      (err) => {
        console.error(err);
        this.toastr.showError(err.error.msg);
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

    this.daily = this.selectedCar.daily;
    this.weekly = this.selectedCar.weekly;
    this.monthly = this.selectedCar.monthly;
    this.annual = this.selectedCar.annual;
  }

  async chooseCustomer(cus: Customer) {
    this.selectedCustomerData = cus.fullName + " " + cus.mobile;

    this.ContractForm.controls["owner"].setValue(this.selectedCustomerData);
  }

  async fetchAllCars() {
    if (this.storageService.getRole() == 1) {
      this.carService.getCars();

      this.carService.cars$.subscribe((res) => {
        this.carData = res;
      });
    } else if (
      this.storageService.getRole() == 2 ||
      this.storageService.getRole() == 3
    ) {
      this.carService.getCarsByBranch();
      this.carService.cars$.subscribe((res) => {
        this.carData = res;
      });
    }
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

  // async loadData() {

  //   this.contractService.getContracts();
  //   this.contractService.contracts$.subscribe((res) => {
  //     this.formData = res;
  //     this.selectedItems = [...checkboxItems];
  //     this.selectedItemsBackCar = [...checkboxItemsBack];
  //     this.getCurrentData();

  //   });

  // }

  async loadData() {
    if (this.storageService.getRole() == 1) {
      this.contractService.getContracts();

      this.contractService.contracts$.subscribe((res) => {
        // this.carData = res;

        this.formData = this.carData;

        // this.filteredData = [...this.formData]
        this.formData = res;
        this.selectedItems = [...checkboxItems];
        this.selectedItemsBackCar = [...checkboxItemsBack];
        this.getCurrentData();
      });
    } else if (
      this.storageService.getRole() == 2 ||
      this.storageService.getRole() == 3
    ) {
      this.contractService.getContractsByBranch();

      this.contractService.contracts$.subscribe((res) => {
        // this.carData = res;

        this.formData = res;
        this.selectedItems = [...checkboxItems];
        this.selectedItemsBackCar = [...checkboxItemsBack];

        // this.filteredData = [...this.formData]
        this.getCurrentData();
      });
    }
  }

  async onChangeRadioValue(event: any, days, daily_val2) {
    let array = [];

    this.selectedRadioValue = event.target.value;

    let res = this.dateService.convertDaysToMWY(days, this.selectedRadioValue);
    console.log('res',res)


    if (this.selectedRadioValue == "daily") {
      this.daily_val1 = days;
      this.daily_val2 = daily_val2;
      console.log('daily_val1',this.daily_val1)
      console.log('daily_val2',this.daily_val2)

    } else if (this.selectedRadioValue == "weekly") {
      this.daily_val1 = res;
      this.daily_val2 = daily_val2;
    } else if (this.selectedRadioValue == "monthly") {
      this.daily_val1 = res;

      this.daily_val2 = daily_val2;
    } else if (this.selectedRadioValue == "annual") {
      this.daily_val1 = res;
      this.daily_val2 = daily_val2;
    }

    this.daily_result = this.daily_val1 * this.daily_val2;
    this.inputsValue[23] = this.daily_result;
    this.payable = this.daily_result - this.advance - this.discount;
    this.sum = this.daily_result;
  }
  calculateResult(event: any) {
    this.daily_result = this.daily_val1 * event.target.value;
   // this.inputsValue[23] = this.daily_result;
    this.inputsValue[22] =  this.ContractForm.controls['daily_val2'].value;
    
  }

  calculate() {
    if (this.inputsValue[26] == null || this.inputsValue[25] === null) {
      this.inputpayable.nativeElement.value = this.daily_result;
      this.inputsum.nativeElement.value= this.daily_result;
    }
    this.inputpayable.nativeElement.value =
      this.daily_result -
      this.inputadv.nativeElement.value -
      this.inputdis.nativeElement.value;

    this.inputsValue[27] = this.inputpayable.nativeElement.value; // payable

    this.inputsValue[26] = this.inputadv.nativeElement.value; // advance
    this.inputsValue[24] = this.inputsum.nativeElement.value; // sum

    //this.inputValue[25] : // discount

    if (this.inputsValue[27] != null) {
      this.show_pdf = true;
    }

    if (parseInt(this.inputsValue[24]) == 0) {
      this.noEditAlertModal = true;
    }
  }

  async openEditContractModal() {
    return await this.editContractModal.open();
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  async getConfirmationValue(value: any, ContractId: number) {
    if (value == "Yes") {
      this.deleteContract(ContractId);
      ("first");
    }
  }

  async open() {
    this.openModal();
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

  async openCarModal() {
    // this.openSearchModal();
    const modalRef = this.modalService.open(CarModalComponent);
    modalRef.componentInstance.carData = this.carData;

    modalRef.componentInstance.carSelected.subscribe((selectedCar: Car) => {
      this.selectedCar = selectedCar;
      this.chooseCar(this.selectedCar);
    });
  }
  async openCustomerModal() {
    // this.openSearchModal();
    const modalRef = this.modalService.open(CustomerModalComponent, {
      size: "xl",
    });
    modalRef.componentInstance.customerData = this.customerData;

    modalRef.componentInstance.customerSelected.subscribe(
      (selectedCust: Customer) => {
        this.selectedCus = selectedCust;
        this.chooseCustomer(this.selectedCus);
      }
    );
  }

  goToInvoice(id: string) {
    return this.router.navigate([
      "/modules/contracts/contract-invoice",
      id,
      this.daily_val2,
    ]);
  }

  getCurrentData() {
    const startIndex = (this.currentPage - 1) * 1;
    const endIndex = startIndex + 1;

    console.log(this.formData);

    this.currentData = this.formData
      .slice(startIndex, endIndex)
      .map((contract: Contract) => {
        return contract.features.map((feature) => ({
          label: feature.label,
          checked: feature.checked,
        }));
      });

    this.currentData1 = this.formData
      .slice(startIndex, endIndex)
      .map((contract: Contract) => {
        return contract.features_back.map((feature) => ({
          label: feature.label,
          checked: feature.checked,
        }));
      });
  }


  pageChanged(event: any, p: any) {
    this.currentPage = event;

    console.log("data", event);
    console.log("p", p);

    this.loadData();
  }



  shareCheckedList(item: any[]) {
    item = item.map((res) => {
      return {
        label: res.label,
        checked: true,
      };
    });
    this.selectedFeatures = item;
    console.log(this.selectedFeatures);
  }
  shareCheckedListBack(item: any[]) {
    item = item.map((res) => {
      return {
        label: res.label,
        checked: true,
      };
    });
    this.selectedFeatures2 = item;
    console.log(this.selectedFeatures2);
  }
  shareIndividualCheckedList(item: {}) {
    console.log(item);
    this.select = item;
  }

  goToAddContract() {
    return this.router.navigate(["/modules/contracts/contract/contract-add"]);
  }

  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address;
    this.inputsValue[8] = this.formattedaddress;
  }
}
