import { ModalComponent } from "src/app/ui/base/modal/modal.component";
import { Permission } from "./../../../core/models/permission.model";
import { PermissionService } from "./../../../core/services/permission.service";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";
import { BranchService } from "src/app/core/services/branch.service";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-branch-list-admin",
  templateUrl: "./branch-list-admin.component.html",
  styleUrls: ["./branch-list-admin.component.scss"],
})
export class BranchListAdminComponent implements OnInit {
  branchs: any[] = [];

  formGroup: FormGroup;

  modal: ModalComponent;
  modaledit: ModalComponent;

  administrations$: Observable<String[]>;

  private permission: Permission;
  constructor(
    private branchService:BranchService,
    private formBuilder: FormBuilder,
    config: NgbModalConfig,
    private toastr: ToastService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.modal = new ModalComponent(config, modalService);
    this.modaledit = new ModalComponent(config, modalService);
    this.formGroup = this.formBuilder.group({
      branch_name: [""],
      administrations: [""],
    });
  }
  createBranch() {
    this.branchService.createBranch(this.formGroup.value).subscribe(
      async (response: any) => {
          if (this.formGroup.valid) {
            this.toastr.showSuccess("Branch added successfully");
          }
         else {
          this.toastr.showError(response.msg);
      }},
      (err) => {
        // Handle the error here
        this.toastr.showError(err.error.msg || "Error in adding the branch details");
      }
    );
  }
  
  showAllUsers: { [key: string]: boolean } = {};

  toggleShowAllUsers(branchId: string) {
    this.showAllUsers[branchId] = !this.showAllUsers[branchId];
  }
  // updatePermission(permission: Permission) {
  //   ("Hello permission");
  //   (permission);
  //   if (permission) {
  //     this.branchService.(permission).subscribe(
  //       (updatePermission) => {
  //       },
  //       (error) => (error)
  //     );
  //   }
  // 

  ngOnInit(): void {
    this.administrations$ = of([
      "Administration 1",
      "Administration 2",
      "Administration 3",
    ]);
    this.loadData();
  }

  loadData() {
    this.branchService.getAllBranches();

    this.branchService.branchs$.subscribe((data) => {
      this.branchs = data;
      console.log(data)
    });
  }

  // deletePermission(perId: number): void {
  //   this.permissionService.delete(perId).subscribe(
  //     () => {
  //       this.toastr.showSuccess("Permission deleted successfully");
  //     },
  //     (err) => {
  //       console.error(err);
  //       this.toastr.showError("Error in deleting the Permission");
  //     }
  //   );
  // }

  getValueAdministration(event:Event) {
    console.log("administration", event);
    this.formGroup.controls['administrations'].setValue(event.toString())

  }

  goToUpdatePermission(id: number) {
    (id);

    return this.router.navigate(["modules/permissions/permissions-update", id]);
  }


}

