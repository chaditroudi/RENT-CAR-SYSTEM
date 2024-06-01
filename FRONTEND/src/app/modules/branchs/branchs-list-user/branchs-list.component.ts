import { BranchService } from './../../../core/services/branch.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-branchs-list',
  templateUrl: './branchs-list.component.html',
  styleUrls: ['./branchs-list.component.scss']
})
export class BranchsListComponent implements OnInit {
  
  branchs:Branch[];
  constructor(
    private storageService:StorageService,
    private readonly toastr:ToastService,
    private auth: AuthService, private router: Router,private branchService:BranchService) {}

  role:number;
  ngOnInit(): void {
    this.role = JSON.parse(this.storageService.getCurrentUser()).data.role;

    if(this.role == 1) {
       this.router.navigate(['/modules/dashboard']);
    }

    this.branchService.getAllBranches();
    this.branchService.branchs$.subscribe((res) => {

   
      this.branchs = res;

    })
    
  }

  goTo(branchId:string,branchName:string) {
    if(this.role == 2 )   {
      this.auth.updateBranch({branch_id:branchId}).subscribe((res)=> {
      
      this.toastr.showSuccess(`You are affected to branch ${branchName}`)
      })
      
      this.router.navigate(['/modules/dashboard'])
    }
    else if(this.role === 3) {
      this.auth.updateBranch({branch_id:branchId}).subscribe((res)=> {
      
        this.toastr.showSuccess(`You are affected to branch ${branchName}`)
        })
        
        this.router.navigate(['/modules/reports'])
      }
  }
}
