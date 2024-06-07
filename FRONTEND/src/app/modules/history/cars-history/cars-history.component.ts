import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-cars-history',
  templateUrl: './cars-history.component.html',
  styleUrls: ['./cars-history.component.scss']
})
export class CarsHistoryComponent  implements OnInit{

  rentedCars :Car[] = [];


  constructor(private readonly staticsService:StatisticsService) {}



  fetchRentedCars() {
    this.staticsService.getRentalCarsHistory();

    this.staticsService.cars$.subscribe((res) => {
      console.log(res)
      this.rentedCars = JSON.parse(JSON.stringify(res));

  })
}

  ngOnInit(): void {

    this.fetchRentedCars();
  }

}
