import { Component, OnInit } from "@angular/core";

import contractsData from "../../../data/contracts";
import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import {
  NgbModalConfig,
  NgbModal,
  NgbNavChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { Options } from "ng5-slider";
import { Router } from "@angular/router";
@Component({
  selector: "app-contract-details",
  templateUrl: "./contract-details.component.html",
  styleUrls: ["./contract-details.component.scss"],
})
export class ContractDetailsComponent implements OnInit {
  public contractData: any;

  totalPages: number;
  pageSize = 1;
  currentPage: number = 1;

  formData = [];

  modal: ModalComponent;

  public show: boolean = false;

  ngOnInit(): void {}

  constructor(config: NgbModalConfig, private modalService: NgbModal,private router:Router) {
    this.modal = new ModalComponent(config, modalService);

    this.contractData = contractsData;
    this.totalPages = Math.ceil(this.contractData.length / this.pageSize);
    this.loadData();
  }

  toggle() {
    this.show = !this.show;
  }

  // pagination
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadData();
    }
  }

  loadData() {
    const start = this.currentPage * this.pageSize;

    const end = Math.min(start + this.pageSize, this.contractData.length);

    this.formData = this.contractData.slice(start, end);
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

  // go to hirer customers:
  goToHirer() {
    this.router.navigate(["/modules/customers/customers-list"]);
  }
}
