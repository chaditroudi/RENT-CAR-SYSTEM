import { StorageService } from '../../../../../core/services/storage.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  public userName: string;
  public role:number
  public roleData:string;
  public profileImg: "assets/images/dashboard/user-profile.png";

  constructor(public router: Router, private authService: AuthService, private userMangementServ: StorageService) {
    if (this.userMangementServ.getIsLoggedIn() ==="CONNECTED") {
      ("true");
      
      this.userName = JSON.parse(this.userMangementServ.getCurrentUser()).data.name;


      this.role = JSON.parse(this.userMangementServ.getCurrentUser()).data.role;

      if(this.role ===1) {
        this.roleData = "Admin"
      }
      else if(this.role === 2) {
        this.roleData = "Editor"
      }
      else {
        this.roleData = "Viewer"
      }
    } else {
      ("NO ");
    }

    
  }

  ngOnInit() {}

  logoutFunc() {
this.authService.logout();

  }
}
