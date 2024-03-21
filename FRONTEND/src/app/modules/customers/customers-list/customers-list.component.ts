import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: "app-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.scss"],
})
export class CustomersListComponent implements OnInit {
  modal: ModalComponent;

  ngOnInit(): void {}

  constructor(config: NgbModalConfig, private modalService: NgbModal,private router: Router) {
    this.modal = new ModalComponent(config, modalService);
  }



  goToListCus() {
    return this.router.navigate(["modules/customers/customers-add"]);
    }

}
