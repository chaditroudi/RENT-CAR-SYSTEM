import { QrCodeModule } from 'ng-qrcode';
import { ContractRoutingModule } from "./contract-routing.module";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "./../../shared/shared.module";
import { InitContractFormComponent } from "./init-contract-form/init-contract-form.component";
import { ContractInvoiceComponent } from "./contract-invoice/contract-invoice.component";
import { CarDetailsComponent } from "./../cars/car-details/car-details.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ContractDetailsComponent } from "./contract-details/contract-details.component";
import { ContractBackupsComponent } from "./contract-backups/contract-backups.component";

@NgModule({
  declarations: [
    ContractDetailsComponent,
    ContractInvoiceComponent,
    InitContractFormComponent,
    ContractBackupsComponent,
  ],
  imports: [
    HttpClientModule,
    QrCodeModule,
    ToastrModule,
    NgbModule,
    SharedModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ContractRoutingModule,
  ],
})
export class ContractModule {}
