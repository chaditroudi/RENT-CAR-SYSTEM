import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarsListComponent } from "./cars/cars-list/cars-list.component";
import { CarDetailsComponent } from "./cars/car-details/car-details.component";
import { ContractDetailsComponent } from "./contract/contract-details/contract-details.component";
import { CustomersListComponent } from "./customers/customers-list/customers-list.component";
import { CustomerAddComponent } from "./customers/customer-add/customer-add.component";
import { ContractInvoiceComponent } from "./contract/contract-invoice/contract-invoice.component";
import { CustomerUpdateComponent } from "./customers/customer-update/customer-update.component";
import { PermissionsDetailsComponent } from "./permissions/permissions-details/permissions-details.component";
import { PermissionUpdateComponent } from "./permissions/permission-update/permission-update.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "cars/car-details",
        component: CarDetailsComponent,
      },
      {
        path:"cars/cars-list",
        component: CarsListComponent
      },
      {
        path:"customers/customers-list",
        component:CustomersListComponent
      },
      {
        path:"customers/customers-add",
        component:CustomerAddComponent
      },
      {
        path:"customers/customers-update/:id",
        component:CustomerUpdateComponent
      },
    
      {
        path:"permissions/permissions-details",
        component: PermissionsDetailsComponent
      },
      {
        path:"permissions/permissions-update/:id",
        component: PermissionUpdateComponent
      },




      
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
