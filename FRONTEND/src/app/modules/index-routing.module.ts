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
import { MainComponent } from "./dashboard/main/main.component";
import { ReportsComponent } from "./reports/reports.component";
import { AuthGuard } from "../core/guards";
import { NotificationsListComponent } from "./notifications/notifications-list/notifications-list.component";
import { UserAddComponent } from "./users/user-add/user-add.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UserUpdateComponent } from "./users/user-update/user-update.component";
import { BranchListAdminComponent } from "./branchs/branch-list-admin/branch-list-admin.component";
import { DrawingComponent } from "../lib/drawing/drawing.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path:'branchs/branch-list-admin',
        component:BranchListAdminComponent
      },
      
      {
        path:'draw/draw',
        component:DrawingComponent
      },
      
      {
        path: "cars/car-details",
        component: CarDetailsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["1", "2"] } 

      },
      {
        path: "dashboard",
        component: MainComponent,
        
        canActivate: [AuthGuard],
        data: { roles: ["1", "2"] } 


      },

      {
        path: "notifications",
        component: NotificationsListComponent,


      },
      {
        path:"reports",
        component: ReportsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["1", "3"] } 


      },

      {
        path:"cars/cars-list",
        component: CarsListComponent,
        canActivate: [AuthGuard]

      },
      {
        path:"customers/customers-list",
        component:CustomersListComponent,
        canActivate: [AuthGuard],
        data: { roles: ["1", "2"] } 


      },
      {
        path:"customers/customers-add",
        component:CustomerAddComponent,
        canActivate: [AuthGuard],
        data: { roles: ["1", "2"] } 


      },
      {
        path:"users/user-add",
        component:UserAddComponent,


      },
      {
        path:"users/user-update/:id",
        component:UserUpdateComponent,


      },
      {
        path:"users/users-list",
        component:UsersListComponent,
     

      },
      {
        path:"customers/customers-update/:id",
        component:CustomerUpdateComponent,
        canActivate: [AuthGuard],
        data: { roles: ["1", "2"] } 


      },
    
      {
        path:"permissions/permissions-details",
        component: PermissionsDetailsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["1"] } 

      },
      {
        path:"permissions/permissions-update/:id",
        component: PermissionUpdateComponent,
        canActivate: [AuthGuard],
        data: { roles: ["1"] } 


      },




      
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}