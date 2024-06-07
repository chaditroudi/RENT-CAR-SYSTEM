
import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards";
import { RoleRedirectGuard } from "src/app/core/guards/role-redirect.guard";
import { MainComponent } from "src/app/modules/dashboard/main/main.component";

export const content: Routes = [

  { path: '', redirectTo: '/modules/dasbhoard', pathMatch: 'full' },
  { path: 'modules/dasbhoard', component: MainComponent , canActivate: [RoleRedirectGuard] ,
  data: { roles: ["1", "2","3"] } },

  {
    
    path: "modules",
    loadChildren: () => import("../../modules/index.module").then((m) => m.IndexModule),
    canActivate: [AuthGuard] ,
    data: { roles: ["1", "2","3"] } 


  },
  {
    path: "modules/contracts",
    loadChildren: () => import("../../modules/contract/contract.module").then((m) => m.ContractModule),
  },

  {
    path:"modules/history",
    loadChildren: () => import("../../modules/history/history.module").then((m) => m.HistoryModule)
  }



];
