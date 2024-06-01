import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/core/services/customer.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { StorageService } from "src/app/core/services/storage.service";

@Component({
  selector: "app-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.scss"],
})
export class CustomersListComponent implements OnInit {

  modal: ModalComponent;
  customers :any[] = [];

  searchQuery:string ="";

  updateFilteredData(query: string) {
    this.searchQuery = query;
  }

  ngOnInit(): void {

    this.fetchAllCust();
    

  }
  async fetchAllCust() {
    if (this.storageService.getRole() == 1) {
      this.customerService.fetchAllCustomers();

      this.customerService.customers$.subscribe((res) => {
        this.customers = res;
      });
    } else if (
      this.storageService.getRole() == 2 ||
      this.storageService.getRole() == 3
    ) {
      this.customerService.fetchAllCustomersByBranch();
      this.customerService.customers$.subscribe((res) => {
        this.customers = res;
      });
    }
  }



  constructor(config: NgbModalConfig,
    private toastr:ToastService,
    private modalService: NgbModal,
    private modalServiceDetails:NgbModal,

    private storageService:StorageService,
    private router: Router,private readonly customerService:CustomerService) {
    this.modal = new ModalComponent(config, modalService);
  }





  deleteCustomer(carId: number): void {
    this.customerService.delete(carId).subscribe(
      () => {
        this.toastr.showSuccess("Customer deleted successfully");
      },
      (err) => {
        console.error(err);
        this.toastr.showError("Error in deleting the customer");
      }
    );

  }

  goToListCus() {
    return this.router.navigate(["modules/customers/customers-add"]);
    }


    goToUpdateCustomer(id:number) {
      return this.router.navigate(["modules/customers/customers-update",id]);


    }

    openCustomerDetailsModal(customer: any) {
      const modalRef = this.modalServiceDetails.open(CustomerDetailsComponent, { size: 'sm' }); // Open modal
      modalRef.componentInstance.customer = customer; 
    }
}
