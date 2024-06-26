import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Car } from 'src/app/core/models/car.model';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { ContractService } from 'src/app/core/services/contract.service';

echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]);

@Component({
  selector: 'app-cars-history',
  templateUrl: './cars-history.component.html',
  styleUrls: ['./cars-history.component.scss']
})
export class CarsHistoryComponent implements OnInit {
  rentedCars: any[] = [];
  chart: any;

  constructor(private readonly contractService: ContractService) {}

  fetchRentedCars() {

    this.contractService.getRentalCarsHistory().subscribe((res) => {
      console.log(res)
      this.rentedCars = JSON.parse(JSON.stringify(res));
      console.log(this.rentedCars);
     // this.renderChart();
    });
  }

  ngOnInit(): void {
    this.fetchRentedCars();
  }

}
