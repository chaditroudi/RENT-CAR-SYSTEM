import { AuthGuard } from 'src/app/core/guards';
import { CarsHistoryComponent } from './cars-history/cars-history.component';
// src/app/feature/feature-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cars',
    component: CarsHistoryComponent,
    canActivate:[AuthGuard],
    data: { roles: ["3"] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }