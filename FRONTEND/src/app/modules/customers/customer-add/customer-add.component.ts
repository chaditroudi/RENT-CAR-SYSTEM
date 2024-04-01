import { CustomerService } from './../../../core/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  customerForm = this.formBuilder.group({
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
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,private readonly customerService:CustomerService) {

  }

  ngOnInit() {}


  addCustomer(): void {


    if (this.customerForm.valid) {

   
      this.customerService.createCustomer(this.customerForm.value).subscribe(
        response => {
          console.log('Customer added successfully', response);
        this.customerForm.reset();
     this.router.navigate(['modules/customers/customers-list']);
        },
        error => {
          console.error('Error adding customer', error);
        }
      );
    }
  }
 
}
