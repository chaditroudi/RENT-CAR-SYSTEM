import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contract } from "src/app/core/models/contract.model";
import { ContractService } from "src/app/core/services/contract.service";

@Component({
  selector: "app-contract-invoice",
  templateUrl: "./contract-invoice.component.html",
  styleUrls: ["./contract-invoice.component.scss"],
})
export class ContractInvoiceComponent implements OnInit {
  contentToConvert: string = "contentToConvert";
  contentToConvertContract: string = "contentToConvertContract";
  contract: Contract;
  id: string;
  price: number;
  constructor(
    private contractService: ContractService,
    private router: ActivatedRoute
  ) {}

  getContract() {
    this.id = this.router.snapshot.params["id"];
    this.price = this.router.snapshot.params["price"];
    this.contractService.getContractById(this.id).subscribe((res: Contract) => {
      this.contract = res;
    });
  }

  ngOnInit() {
    this.getContract();
  }
}
