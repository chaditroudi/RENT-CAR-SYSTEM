import { DateService } from './../../../shared/services/date.service';
import { Customer } from './../../../core/models/customer.model';
import { CustomerService } from './../../../core/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {

  customerId: string;
  customer: Customer ;
  errorMessage: string = '';

  customerForm:FormGroup;


  
  constructor(private activatedRoute: ActivatedRoute,
    private readonly router:Router,
    private readonly customerService:CustomerService,
    private readonly dateService:DateService,
    private readonly formBuilder:FormBuilder
    ) {
      this.customerForm = this.formBuilder.group({
        passport_number: [0],
        id_number: [0],
        title: [''],
        fullName: [''],
        date_birth: [''],
        license_number: [''],
        issued_by: [''],
        issued_on: [''],
        expiry_date: [''],
        passport_expiry: [''],
        mobile: [''],
        telephone: [''],
        email: [''],
        QAR_address: [''],
        permanent_address: [''],
        person_name: [''],
        home_country: [''],
        nationality: ['']
      });

  }

  formattedDate:string;


  ngOnInit() {
   
    this.activatedRoute.params.subscribe(params => {
      this.customerId = params['id'];
      
      
      this.customerService.getCustomerById(this.customerId).subscribe(res => {
        this.customer = res;

        console.log(this.customer)
        
      });
    });
  }

  

  



  updateCustomer() {
    if (this.customer && this.customerId) {
      this.customerService.updateCustomer(this.customer)
        .subscribe(updatedCustomer => {
          // Handle successful update (e.g., show success message, navigate back to customer list)
          console.log('Customer updated successfully:', updatedCustomer);
       //   this.router.navigate(['/customers']); // Replace with your desired route after update
        }, error => this.errorMessage = error.message);
    }
  }
}