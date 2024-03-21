import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  public jobs: any
  public arr: any
  public jobForm: FormGroup;
  public dropdownList: any;
  public selectedItems: any;
  public dropdownSettings: any;
  model1: Date;
  model2: Date;
  model3: Date;
  model4: Date;
  model5: Date;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.jobForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      rpassword: ['', Validators.required],
      collegename: ['', Validators.required],
      specialization: ['', Validators.required],
      location: ['', Validators.required],
      company_name: ['', Validators.required],
    })
    this.dropdownList = [
      { "id": 1, "itemName": "India" },
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" },
      { "id": 5, "itemName": "South Korea" },
      { "id": 6, "itemName": "Germany" },
      { "id": 7, "itemName": "France" },
      { "id": 8, "itemName": "Russia" },
      { "id": 9, "itemName": "Italy" },
      { "id": 10, "itemName": "Sweden" }
    ];
    this.selectedItems = [
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" },
      { "id": 5, "itemName": "South Korea" }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Countries",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }
}
