import { NavService } from "src/app/shared/services/nav.service";
import { AuthService } from "./../../../core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";
import { StorageService } from "src/app/core/services/storage.service";
import { LoadingBarService } from "@ngx-loading-bar/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public newUser = false;
  public loginForm: FormGroup;
  public show: boolean = false;
  public errorMessage: any;

  constructor(
    private fb: FormBuilder,

    private loader: LoadingBarService,
    public router: Router,
    private navService: NavService,
    private userServMang: StorageService,
    private authService: AuthService,
    private toastr: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  role = 0;

  login() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((res) => {
        this.role = JSON.parse(this.userServMang.getCurrentUser()).data.role;

        this.navService.updateMenuItems(this.role);


        if(res.success === false) {
          this.toastr.showError(res.msg);
          return;
        }
        if (res.success ) {
          this.toastr.showSuccess(res.msg);
          res.data.role == 1 ? this.router.navigate(["/modules/dashboard"]) :
          res.data.branch_id == null ? this.router.navigate(["/branchs/branch-list"]) :
          res.data.role == 2 ? this.router.navigate(["/modules/dashboard"]) :
          res.data.role == 3 ? this.router.navigate(["/modules/reports"]) : null;

        }
      });
  }

  showPassword() {
    this.show = !this.show;
  }
}
