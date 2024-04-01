import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/core/services/customer.service";
import { ToastService } from "src/app/shared/services/toast.service";

@Component({
  selector: "app-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.scss"],
})
export class CustomersListComponent implements OnInit {
  modal: ModalComponent;
  customers :any[] = [];



  ngOnInit(): void {
    this.customerService.customers$.subscribe(data => {
      this.customers = data;
    });
    this.customerService.fetchAllCustomers();
  }


  constructor(config: NgbModalConfig,
    private toastr:ToastService,
    private modalService: NgbModal,private router: Router,private readonly customerService:CustomerService) {
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

}
