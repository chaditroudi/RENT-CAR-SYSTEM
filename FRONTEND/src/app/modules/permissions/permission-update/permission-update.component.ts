import { Permission } from "../../../core/models/permission.model";
import { PermissionService } from "../../../core/services/permission.service";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastService } from "src/app/shared/services/toast.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-permission-update",
  templateUrl: "./permission-update.component.html",
  styleUrls: ["./permission-update.component.scss"],
})
export class PermissionUpdateComponent implements OnInit {
  permissions: any[] = [];

  formGroup: FormGroup;

  permission:Permission;



  constructor(
    private permissionService: PermissionService,
    private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute,

      private toastr:ToastService,
  ) {
    this.formGroup = this.formBuilder.group({
      default: [""],
      permission_name: [""],
    });
  }



  

  updatePermission(permission:Permission) {
    console.log("Hello permission")
    console.log(permission)
    if (permission) {
      this.permissionService.updatepermission(permission)
        .subscribe(updatePermission => {
          console.log('Permission updated successfully:', updatePermission);
        }, error => console.log(error));
    }
  }
  id:string;

 
  ngOnInit() {
   
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      
      
      this.permissionService.getpermissionById(this.id).subscribe(res => {
        this.permission = res;

        console.log(res)
        
      });
    });
  }




  

  


 
}
