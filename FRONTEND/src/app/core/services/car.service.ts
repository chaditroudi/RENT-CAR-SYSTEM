import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';
import { baseUrl } from '../api/base.url';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Object[]> {
    return this.http.get<Car[]>(`${baseUrl}/car/display-cars`);
    
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  } 

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/car/add-car`,data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/car/update-car/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/car/delete-car${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Car[]> {
    return this.http.get<Car[]>(`${baseUrl}?title=${title}`);
  }
}



