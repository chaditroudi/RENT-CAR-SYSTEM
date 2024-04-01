import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { baseUrl } from '../api/base.url';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carSource = new BehaviorSubject<any[]>([]);
  cars$ = this.carSource.asObservable();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Object[]> {
   
    return this.http.get<Car[]>(`${baseUrl}/car/display-cars`);
    
  }

  




  getCars() {
    return this.http.get<any[]>(`${baseUrl}/car/display-cars`).subscribe(data => {
      this.carSource.next(data);
    })


  }


  get(id: any) :Observable<Object> {
    return this.http.get(`${baseUrl}/car/get-car/${id}`);
  } 

  create(data: any) {
    return this.http.post(`${baseUrl}/car/add-car`,data).pipe(tap((newCar) =>{
      const cars = this.carSource.value;
      cars.push(newCar);
      this.carSource.next(cars);
    }))
    ;
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/car/update-car/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/car/delete-car/${id}`).pipe(tap(()=> {
      const newData = this.carSource.value.filter(item => item._id !==id);
      console.log("new data=",newData);

      this.carSource.next(newData);
    }))}
   


  findByTitle(title: any): Observable<Car[]> {
    return this.http.get<Car[]>(`${baseUrl}?title=${title}`);
  }
}



