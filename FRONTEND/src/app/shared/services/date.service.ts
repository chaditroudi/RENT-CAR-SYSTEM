import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }



  formatDate(date: Date): string {
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }




  convertDaysToMWY(days:number,type:string) {


    let annual = Math.round((days/365)*100)/100;
    let months = Math.round((days/30)*100)/100;
    let weekly = Math.round((days/7)*100)/100;






    if(type === 'monthly') {
      return months
    }
    else if(type === 'weekly') {

      console.log("week",weekly)
      return weekly;
    }
    else {
      return annual;
    }



  }
  

}