import { CustomerService } from './../../../core/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Customer } from 'src/app/core/models/customer.model';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {

  nameArray: File[] = [];
  customerForm: FormGroup;
  customerId: string; // Assuming you have a customerId to identify the customer being edited
  existingCustomer:Customer;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private readonly customerService: CustomerService) {
    this.customerForm = this.formBuilder.group({
      passport_number: [''],
      id_number: [''],
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
      nationality: [''],
      files: [''],
    });
  }

  ngOnInit() {
   
    this.activatedRoute.params.subscribe(params => {
      this.customerId = params['id'];

      
      
      this.customerService.getCustomerById(this.customerId).subscribe(res => {
        console.log(res)
        this.existingCustomer = JSON.parse(JSON.stringify(res));
        this.customerForm.patchValue({...this.existingCustomer})

        
      });
    });
  }
  updateCustomer(): void {
    const formData = new FormData();

    if (this.customerForm.valid) {
      for (const key in this.customerForm.value) {
        if (key === 'files') {
          for (const file of this.nameArray) {  
            console.log(file)
            formData.append('files', file);
          }
        } else {
          formData.append(key, this.customerForm.get(key).value);
        }
      }
      
      this.customerService.updateCustomer(this.customerId,this.customerForm.value).subscribe(
        response => {
          this.customerForm.reset();
          this.router.navigate(['modules/customers/customers-list']);
        },
        error => {
          console.error('Error updating customer', error);
        }
      );
    }
  }

  onSelect1(event: any): void {
    this.nameArray.push(...event.addedFiles);
    this.customerForm.controls['files'].setValue(this.nameArray.map((res)=>res.name))
    console.log(this.customerForm.value)
  }

  onRemove(file: File): void {
    this.nameArray = this.nameArray.filter(f => f !== file);
  }
}
