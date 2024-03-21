import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './pagination/pagination.component';




@NgModule({
  declarations: [
    
    PaginationComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
})
export class BaseModule {}
