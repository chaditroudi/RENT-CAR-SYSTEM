import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr:ToastrService) { }


  showSuccess(message:string) {
    this.toastr.success(message, "success", {
      positionClass: 'toast-bottom-center',  
      progressBar: true, 
      closeButton: true, 
      timeOut: 5000,
      extendedTimeOut: 2000,
    });
  }
  
  showError(message:string) {
    this.toastr.error(message, "error", {
      positionClass: 'toast-bottom-center',  
      progressBar: true, 
      closeButton: true, 
      timeOut: 5000,
      extendedTimeOut: 2000,
    });
  }

  
}
