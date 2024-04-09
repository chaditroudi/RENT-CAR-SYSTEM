import { PermissionUpdateComponent } from "./permissions/permission-update/permission-update.component";
import { IndexRoutingModule } from "./index-routing.module";
import { NgxPaginationModule } from "ngx-pagination";
import { CarsListComponent } from "./cars/cars-list/cars-list.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CarDetailsComponent } from "./cars/car-details/car-details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContractDetailsComponent } from "./contract/contract-details/contract-details.component";
import { CustomersListComponent } from "./customers/customers-list/customers-list.component";
import { CustomerAddComponent } from "./customers/customer-add/customer-add.component";
import { ContractInvoiceComponent } from "./contract/contract-invoice/contract-invoice.component";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { InitCarFormComponent } from "./cars/init-car-form/init-car-form.component";
import { CustomerUpdateComponent } from "./customers/customer-update/customer-update.component";
import { PermissionsDetailsComponent } from "./permissions/permissions-details/permissions-details.component";
import { InitContractFormComponent } from "./contract/init-contract-form/init-contract-form.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CarModalComponent } from "./cars/car-modal/car-modal.component";
import { CustomerModalComponent } from './customers/customer-modal/customer-modal.component';

@NgModule({
  declarations: [
    CarDetailsComponent,
    CarsListComponent,
    //ContractDetailsComponent,
    CustomersListComponent,
    CustomerAddComponent,
    CustomerUpdateComponent,
   // ContractInvoiceComponent,
    InitCarFormComponent,

    CustomerUpdateComponent,
    PermissionsDetailsComponent,
    CarModalComponent,
    PermissionUpdateComponent,
    CustomerModalComponent,
    
    
   // InitContractFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ToastrModule,
    NgbModule,

    NgxPaginationModule,
    IndexRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class IndexModule {}
