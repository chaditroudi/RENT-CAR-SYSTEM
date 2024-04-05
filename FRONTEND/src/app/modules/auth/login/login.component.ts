import { NavService } from 'src/app/shared/services/nav.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from 'src/app/shared/services/toast.service';
import { StorageService } from "src/app/core/services/storage.service";
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public newUser = false;
  public loginForm: FormGroup;
  public show: boolean = false
  public errorMessage: any;


 
  constructor(private fb: FormBuilder, 
    
    private loader: LoadingBarService,
    public router: Router,
    private navService:NavService,
    private userServMang:StorageService,
    private authService:AuthService,private toastr:ToastService) {
    this.loginForm = this.fb.group({
      email: ["admin@gmail.com", [Validators.required, Validators.email]],
      password: ["12345678", Validators.required],
    });
  }

  ngOnInit() {}

  

  role = 0;

  login() {
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(res => {
      this.role = JSON.parse(this.userServMang.getCurrentUser()).data.role;

      this.navService.updateMenuItems(this.role);

      console.log("resultat login cp",res);

      
      this.toastr.showSuccess(res.msg);

      this.router.navigate(['/dashboard']);


    }
    )
  }

  showPassword(){
    this.show = !this.show
  }

 
}
