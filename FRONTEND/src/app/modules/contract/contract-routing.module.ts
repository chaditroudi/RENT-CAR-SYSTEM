import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractBackupsComponent } from './contract-backups/contract-backups.component';
import { ContractInvoiceComponent } from './contract-invoice/contract-invoice.component';

const routes: Routes = [
  {
    path: "",
    children: [
  

      {
        path:"contract/contract-details",
        component: ContractDetailsComponent
      },
      
      {
        path:"contract/contract-backups",
        component: ContractBackupsComponent
      },
      {
        path:"contract-invoice/:id/:price",
        component: ContractInvoiceComponent
      },
      
    



      
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {}
