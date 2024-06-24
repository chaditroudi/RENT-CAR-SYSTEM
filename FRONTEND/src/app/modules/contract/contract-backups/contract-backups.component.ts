import { ContractBackup } from './../../../core/models/contract-backup.model';
import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "src/app/core/services/customer.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { ContractService } from "src/app/core/services/contract.service";

@Component({
  selector: "app-contract-backups",
  templateUrl: "./contract-backups.component.html",
  styleUrls: ["./contract-backups.component.scss"],
})
export class ContractBackupsComponent implements OnInit {
  modal: ModalComponent;
  contracts :any[] = [];

  contractId:string;

  
  constructor(config: NgbModalConfig,
    private toastr:ToastService,
    private route:ActivatedRoute,
    private modalService: NgbModal,private router: Router,private readonly contractService:ContractService) {
    this.modal = new ModalComponent(config, modalService);
  }



  ngOnInit(): void {
    this.contractId = this.route.snapshot.paramMap.get('id');

    this.contractService.getContractsBackup(this.contractId);

    this.contractService.contracts$.subscribe((data) => {
      console.log("contract id ",data)
      this.contracts = data;
    });    

  }






  
  goToListContracts() {
    return this.router.navigate(["modules/customers/customers-add"]);
    }


   

}
