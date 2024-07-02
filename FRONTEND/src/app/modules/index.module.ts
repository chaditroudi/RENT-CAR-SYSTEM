import { LoadingSpinnerModule } from './../ui/base/loading-spinner/loading-spinner.module';
import { ReportsComponent } from './reports/reports.component';
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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CarModalComponent } from "./cars/car-modal/car-modal.component";
import { CustomerModalComponent } from "./customers/customer-modal/customer-modal.component";
import { FilterPipe } from "../shared/pipe/filter.pipe";
import { NotificationsListComponent } from './notifications/notifications-list/notifications-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BranchsListComponent } from './branchs/branchs-list-user/branchs-list.component';
import { BranchListAdminComponent } from './branchs/branch-list-admin/branch-list-admin.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CarsHistoryComponent } from './history/cars-history/cars-history.component';
import { ContractsHistoryComponent } from './history/contracts-history/contracts-history.component';
import { CustomersHistoryComponent } from './history/customers-history/customers-history.component';
import { ImageUrlPipe } from '../shared/pipe/image-url.pipe';
import { DrawingComponent } from '../lib/drawing/drawing.component';

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
    ReportsComponent,
    
    DrawingComponent,
    UserAddComponent,

     ImageUrlPipe,

    FilterPipe,
      NotificationsListComponent,
      UserAddComponent,
      UsersListComponent,
      UserUpdateComponent,
      BranchListAdminComponent,
      CustomerDetailsComponent,
      CarsHistoryComponent,
      ContractsHistoryComponent,
      CustomersHistoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NgSelectModule,
    NgxDropzoneModule,

    LoadingSpinnerModule,
    ToastrModule,
    NgbModule,

    NgxPaginationModule,
    IndexRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class IndexModule {}
