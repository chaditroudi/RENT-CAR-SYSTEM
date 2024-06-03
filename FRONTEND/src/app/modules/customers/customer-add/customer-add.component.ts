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

  nameArray: File[] = [];
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
    nationality: [''],
    files:[],
  
  });
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,private readonly customerService:CustomerService) {

  }

  ngOnInit() {}


  addCustomer(): void {

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
      
      
      this.customerService.createCustomer(formData).subscribe(
        response => {
        this.customerForm.reset();
     this.router.navigate(['modules/customers/customers-list']);
        },
        error => {
          console.error('Error adding customer', error);
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
