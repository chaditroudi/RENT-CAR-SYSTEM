import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-cars-list",
  templateUrl: "./cars-list.component.html",
  styleUrls: ["./cars-list.component.scss"],
})
export class CarsListComponent implements OnInit {
  modal: ModalComponent;

  ngOnInit(): void {}

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    this.modal = new ModalComponent(config, modalService);
  }

  // Modal add new Car
}
