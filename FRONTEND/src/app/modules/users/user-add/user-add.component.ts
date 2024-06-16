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
import { BranchService } from "src/app/core/services/branch.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { Branch } from "src/app/core/models";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"],
})
export class UserAddComponent implements OnInit {
  role$: Observable<String[]>;
  administrations$: Observable<String[]>;
  branchNames$: Observable<String[]>;

  userForm = this.formBuilder.group({
    administration: [""],
    email: [""],
    name: [""],
    role: [0],
    password: [""],
    _id: [""],
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
    private branchService: BranchService,
    private toasterService:ToastService
  ) {
    this.role$ = of(["Editor", "Viewer"]);
    this.administrations$ = of([
      "Administration 1",
      "Administration 2",
      "Administration 3",
    ]);
  }

  ngOnInit() {
    this.branchService.getAllBranches();

    this.branchService.branchs$.subscribe((res) => {

      console.log(res)
      this.branchNames$ = of(res);

      console.log(res);
    });
  }

  adddUser(): void {

    const userObj = {
      administration: this.userForm.value.administration,
      email: this.userForm.value.email,
      name: this.userForm.value.name,
      role: this.role,
      password: this.userForm.value.password,
      branch_id: this.userForm.value._id,
      
    };
    if (this.userForm.valid) {
      this.userService.createCustomer(userObj).subscribe(
        (response) => {

         this.toasterService.showSuccess(response.message);
          this.userForm.reset();
          this.router.navigate(["modules/users/users-list"]);
        },
        (err) => {
          console.log(err);
          this.toasterService.showError(err.error.msg);
        }
      );
    }}    
  role: number;
  getValueRole(event: string) {
    this.userForm.value.role =
      event === "Editor"
        ? 2
        : event === "Admin"
        ? 1
        : event === "Viewer"
        ? 3
        : 0;
    console.log(this.userForm.value.role);
    this.role = this.userForm.value.role;
  }

  getValueAdmin(event: Event) {
    console.log("administration", event);
    this.userForm.controls["administration"].setValue(event.toString());
  }

  getValueBranch(event: Branch) {
    this.userForm.controls['_id'].setValue(event._id);

    
  }
}
