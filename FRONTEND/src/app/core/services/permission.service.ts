import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { baseUrl } from "../api/base.url";
import { Permission } from "../models/permission.model";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  private permissionSource = new BehaviorSubject<any[]>([]);
  public permissions$ = this.permissionSource.asObservable();


  public accessToken ='';

  constructor(private http: HttpClient,private userMangementServ:StorageService) {}




   getHeaders():HttpHeaders{
    this.accessToken = JSON.parse(this.userMangementServ.getCurrentUser()).accessToken;
    console.log(this.accessToken,"acctoken")

    console.log("token",this.accessToken)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })
  }
  

  fetchAllpermissions(): void {
    const headers = this.getHeaders();
    console.log(headers)
    this.http
      .get<any[]>(`${baseUrl}/admin/get-permissions`,{headers})
      .subscribe((permissions) => {
        this.permissionSource.next(permissions);
      });
  }

  createPermission(permissionData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http
      .post(`${baseUrl}/admin/add-permission`, permissionData,{headers})
      .pipe(
        tap((newPermission) => {
          console.log("***",this.permissionSource)
          const permissions = this.permissionSource.value;
          permissions.push(newPermission);
          this.permissionSource.next(permissions);
        })
      );
  }

  getpermissionById(id: string): Observable<Permission> {
    const headers = this.getHeaders();
    
    return this.http.get<any>(`${baseUrl}/admin/get-permission-by-id/${id}`,{headers});
  }

  updatepermission(permission: Permission): Observable<Permission> {
    const headers = this.getHeaders();

    console.log(permission)
    return this.http
      .put<Permission>(`${baseUrl}/admin/update-permission/${permission._id}`, permission,{headers})
      .pipe(
        map((updatedpermission) => {
          console.log("permission updated successfully:", updatedpermission);
          return updatedpermission;
        })
      );
  }

  delete(id: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.delete(`${baseUrl}/admin/delete-permission/${id}`,{headers}).pipe(
      tap(() => {
        const newData = this.permissionSource.value.filter(
          (item) => item._id !== id
        );
        console.log("new data=", newData);

        this.permissionSource.next(newData);
      })
    );
  }
}
