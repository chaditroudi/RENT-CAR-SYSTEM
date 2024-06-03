import { DateService } from './../../../shared/services/date.service';
import { Customer } from './../../../core/models/customer.model';
import { CustomerService } from './../../../core/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  customerId: string;
  customer: User ;
  errorMessage: string = '';

  customerForm:FormGroup;


  
  constructor(private activatedRoute: ActivatedRoute,
    private readonly router:Router,
    private readonly customerService:UserService,
    private readonly dateService:DateService,
    private readonly formBuilder:FormBuilder
    ) {
      this.customerForm = this.formBuilder.group({
        administration:[''],
        email:[''],
        name:['']
      });

  }

  formattedDate:string;


  ngOnInit() {
   
    this.activatedRoute.params.subscribe(params => {
      this.customerId = params['id'];
      
      
      this.customerService.getCustomerById(this.customerId).subscribe(res => {
        this.customer = res;

        (this.customer)
        
      });
    });
  }

  

  



  updateCustomer() {
    if (this.customer && this.customerId) {
      this.customerService.updateCustomer(this.customer)
        .subscribe(updatedCustomer => {
      
        }, error => this.errorMessage = error.message);
    }
  }
}