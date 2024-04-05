
import { Routes } from "@angular/router";

export const content: Routes = [

  {
    path: "modules",
    loadChildren: () => import("../../modules/index.module").then((m) => m.IndexModule),
  },
  {
    path: "modules/contracts",
    loadChildren: () => import("../../modules/contract/contract.module").then((m) => m.ContractModule),
  },

];
