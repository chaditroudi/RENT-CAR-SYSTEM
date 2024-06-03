import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { baseUrl } from "../api/base.url";
import { Permission } from "../models/permission.model";
import { StorageService } from "./storage.service";
import { Report } from "../models";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  private reportSource = new BehaviorSubject<any[]>([]);
  private reportMonthlySource = new BehaviorSubject<any[]>([]);
  private reportYSource = new BehaviorSubject<any[]>([]);

  
  public reports$ = this.reportSource.asObservable();
  public reportsMonthly$ = this.reportMonthlySource.asObservable();
  public reportsYearly$ = this.reportYSource.asObservable();


  public accessToken ='';

  constructor(private http: HttpClient,private userMangementServ:StorageService) {}

   getHeaders():HttpHeaders{
    this.accessToken = JSON.parse(this.userMangementServ.getCurrentUser()).accessToken;

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })
  }

  fetchAllreports() {
    const headers = this.getHeaders();
    (headers)
    return this.http
      .get<any[]>(`${baseUrl}/report/get-reports`,{headers})
      .subscribe((permissions) => {
        this.reportSource.next(permissions);
      });
      
  }


  reportsStatistics(data:any) {
    const headers = this.getHeaders();
    (headers)
    return this.http
      .post<any[]>(`${baseUrl}/report/getWeeklyReports`,data,{headers})
      .subscribe((permissions) => {
        this.reportSource.next(permissions);
      });
      
  }
  fetchMonthlyReports(data:any) {
    const headers = this.getHeaders();
    (headers)
    return this.http
      .post<any[]>(`${baseUrl}/report/getMonthlyReports`,data,{headers})
      .subscribe((permissions) => {
        this.reportMonthlySource.next(permissions);
      });
      
  }
  fetchYearlyReports(data:any) {
    const headers = this.getHeaders();
    (headers)
    return this.http
      .post<any[]>(`${baseUrl}/report/getYearlyReports`,data,{headers})
      .subscribe((permissions) => {
        this.reportYSource.next(permissions);
      });
      
  }

  fetchCountContract() {
    return this.http.get(`${baseUrl}/report/getContractCount`);
  }




  

  
  
  fetchMonthlyRep() {
    const headers = this.getHeaders();
    (headers)
    return this.http
      .get<any[]>(`${baseUrl}/report/get-monthly-reports
      `,{headers})
      .subscribe((permissions) => {
        this.reportSource.next(permissions);
      });
      
  }




  createReport(reportData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http
      .post(`${baseUrl}/report/add-report`, reportData,{headers})
      .pipe(
        tap((newReport) => {
          const reports = this.reportSource.value;
          reports.push(newReport);
          this.reportSource.next(reports);
        })
      );
  }


  updateReport(report: Report): Observable<Report> {
    const headers = this.getHeaders();

    (report)
    return this.http
      .put<Report>(`${baseUrl}/report/update-report/${report._id}`, report,{headers})
      .pipe(
        map((updatedpermission) => {
          return updatedpermission;
        })
      );
  }

  delete(id: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.delete(`${baseUrl}/report/delete-report/${id}`,{headers}).pipe(
      tap(() => {
        const newData = this.reportSource.value.filter(
          (item) => item._id !== id
        );

        this.reportSource.next(newData);
      })
    );
  }
}
