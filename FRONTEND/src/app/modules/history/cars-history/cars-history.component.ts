import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Car } from 'src/app/core/models/car.model';
import { StatisticsService } from 'src/app/core/services/statistics.service';

echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]);

@Component({
  selector: 'app-cars-history',
  templateUrl: './cars-history.component.html',
  styleUrls: ['./cars-history.component.scss']
})
export class CarsHistoryComponent implements OnInit {
  rentedCars: any[] = [];
  chart: any;

  constructor(private readonly staticsService: StatisticsService) {}

  fetchRentedCars() {

    this.staticsService.getRentalCarsHistory().subscribe((res) => {
      console.log(res)
      this.rentedCars = JSON.parse(JSON.stringify(res));
      console.log(this.rentedCars);
      this.renderChart();
    });
  }

  ngOnInit(): void {
    this.fetchRentedCars();
  }
  renderChart(): void {
    const xAxisData = this.rentedCars.map(item => item.car.model);
    const seriesData = this.rentedCars.map(item => item.count);

    if (!this.chart) {
      this.chart = echarts.init(document.getElementById('chart-container'));
    }

    const option = {
      title: {
        text: 'Rented Cars History'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Number of Customers']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Number of Customers',
        type: 'bar',
        data: seriesData
      }]
    };

    this.chart.setOption(option);
  }
}