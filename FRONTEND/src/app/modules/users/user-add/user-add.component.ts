import { UserService } from "./../../../core/services/user.service";
import { CustomerService } from "./../../../core/services/customer.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"],
})
export class UserAddComponent implements OnInit {
  role$: Observable<String[]>;
  administrations$: Observable<String[]>;

  userForm = this.formBuilder.group({
    administration: [""],
    email: [""],
    name: [""],
    role: [0],
    password:[""]
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {
    this.role$ = of([ "Editor", "Viewer"]);
    this.administrations$ = of([
      "Administration 1",
      "Administration 2",
      "Administration 3",
    ]);
  }

  ngOnInit() {}

  adddUser(): void {

   
    const userObj = {
      administration: this.userForm.value.administration,
      email: this.userForm.value.email,
      name: this.userForm.value.name,
      role: this.role,
      password: this.userForm.value.password
    };
    if (this.userForm.valid) {

      
      this.userService.createCustomer(userObj).subscribe(
        (response) => {
          this.userForm.reset();
          this.router.navigate(["modules/users/users-list"]);
        },
        (error) => {
          console.error("Error addinguser", error);
        }
      );
    }
  }

  role:number;
  getValueRole(event: string) {
    this.userForm.value.role = event === 'Editor' ? 2 :
   
    event === 'Admin' ? 1:
    event ==='Viewer' ? 3 : 0
    console.log(this.userForm.value.role)
    this.role = this.userForm.value.role;



  }

  getValueAdmin(event:Event) {
    console.log("administration", event);
    this.userForm.controls['administration'].setValue(event.toString())

  }
}
