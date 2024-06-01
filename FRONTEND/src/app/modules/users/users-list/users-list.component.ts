import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/core/services/customer.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent implements OnInit {
  modal: ModalComponent;
  customers :any[] = [];

  searchQuery:string ="";


  ngOnInit(): void {
    this.customerService.customers$.subscribe(data => {
      this.customers = data;
    });
    this.customerService.fetchAllCustomers();
  }


  constructor(config: NgbModalConfig,
    private toastr:ToastService,
    private modalService: NgbModal,private router: Router,private readonly customerService:UserService) {
    this.modal = new ModalComponent(config, modalService);
  }





  deleteCustomer(carId: number): void {
    this.customerService.delete(carId).subscribe(
      () => {
        this.toastr.showSuccess("User deleted successfully");
      },
      (err) => {
        console.error(err);
        this.toastr.showError("Error in deleting the user");
      }
    );

  }

  goToListCus() {
    return this.router.navigate(["modules/users/user-add"]);
    }


    goToUser(id:number) {
      return this.router.navigate(["modules/users/user-update",id]);


    }

}
