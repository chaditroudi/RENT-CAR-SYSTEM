import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { Permission } from "./../../../core/models/permission.model";
import { PermissionService } from "./../../../core/services/permission.service";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-permissions-details",
  templateUrl: "./permissions-details.component.html",
  styleUrls: ["./permissions-details.component.scss"],
})
export class PermissionsDetailsComponent implements OnInit {
  permissions: any[] = [];

  formGroup: FormGroup;

  modal: ModalComponent;
  modaledit: ModalComponent;

  private permission: Permission;
  constructor(
    private permissionService: PermissionService,
    private formBuilder: FormBuilder,
    config: NgbModalConfig,
    private toastr: ToastService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.modal = new ModalComponent(config, modalService);
    this.modaledit = new ModalComponent(config, modalService);
    this.formGroup = this.formBuilder.group({
      default: [""],
      permission_name: [""],
    });
  }

  createPermission() {
    this.permissionService.createPermission(this.formGroup.value).subscribe(
      (response) => {
        (response);

        if (this.formGroup.valid) {
          this.toastr.showSuccess("permission added successfully");
        }
        if (response) {
        } else {
          this.toastr.showError("Error in adding the permission details");
        }
      },
      (err) => {
        (err);
      }
    );
  }

  updatePermission(permission: Permission) {
    ("Hello permission");
    (permission);
    if (permission) {
      this.permissionService.updatepermission(permission).subscribe(
        (updatePermission) => {
        },
        (error) => (error)
      );
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.permissionService.fetchAllpermissions();

    this.permissionService.permissions$.subscribe((data) => {
      this.permissions = data;
    });
  }

  deletePermission(perId: number): void {
    this.permissionService.delete(perId).subscribe(
      () => {
        this.toastr.showSuccess("Permission deleted successfully");
      },
      (err) => {
        console.error(err);
        this.toastr.showError("Error in deleting the Permission");
      }
    );
  }

  goToUpdatePermission(id: number) {
    (id);

    return this.router.navigate(["modules/permissions/permissions-update", id]);
  }
}
