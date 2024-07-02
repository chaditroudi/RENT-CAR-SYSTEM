import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ContractService } from 'src/app/core/services/contract.service';
import { Car } from 'src/app/core/models/car.model';

echarts.use([BarChart, TitleComponent, TooltipComponent, GridComponent, CanvasRenderer]);

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  chartData: any;
  originalData: any;
  myChart: echarts.ECharts;
  rentedCars:any[] = [];

  constructor(private chartService: ContractService) {}

  ngOnInit(): void {
    this.fetchWeeklyReport();  
  }

  fetchWeeklyReport(): void {
    this.chartService.weeklyReports().subscribe(
      (data) => {
        this.originalData = data;
        this.chartData = data;
        this.createChart('Weekly Income Report', 'dayOfWeek', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
      },
      (error) => {
        console.error('Error fetching weekly report:', error);
      }
    );
  }

  fetchMonthlyReport(): void {
    this.chartService.monthlyReports().subscribe(
      (data) => {
        this.originalData = data;
        this.chartData = data;
        this.createChart('Monthly Income Report', 'month', null);
      },
      (error) => {
        console.error('Error fetching monthly report:', error);
      }
    );
  }
  fetchAnnualReport(): void {
    this.chartService.annualReports().subscribe(
      (data) => {
        this.originalData = data;
        this.chartData = data;
        this.createChart('Annual Income Report', 'year', null);
      },
      (error) => {
        console.error('Error fetching annual report:', error);
      }
    );
  }

  filterData(selectedYearInput: any): void {
    const selectedYear = selectedYearInput ? parseInt(selectedYearInput, 10) : null;
  
    this.chartData = this.originalData.filter(item => {
      const date = new Date(item.date);
      return selectedYear === null || date.getFullYear() === selectedYear;
    });
  
    this.updateChart();
  }

  createChart(title: string, xAxisKey: string, xAxisLabels: string[] | null): void {
    const chartDom = document.getElementById('myChart') as HTMLDivElement;
    this.myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisLabels
        ? this.chartData.map(item => xAxisLabels[item._id[xAxisKey] - 1])
        : this.chartData.map(item => item._id.month ? `${item._id.month}/${item._id.year}` : `${item._id.year}`),
        axisLabel: {
          rotate: 45,  
          formatter: (value: string) => value.split('/').join('\n')  
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '${value}'  
        }
      },
      
      toolbox: {
        feature: {
          saveAsImage: { show: true, title: 'Save as Image' },
          dataZoom: { show: true, title: 'Data Zoom' },
          dataView: { show: true, title: 'Data View', readOnly: true },
          magicType: {
            show: true,
            type: ['line', 'bar',], 
            title: {
              line: 'Switch to Line Chart',
              bar: 'Switch to Bar Chart',
              Area: 'Switch to Funnel Chart'
            }
          },
          restore: { show: true, title: 'Restore' },
          saveAsPDF: { show: true, title: 'Save as PDF', pixelRatio: 2 }
        }
      
      },
      series: [{
        name: 'Total Income',
        type: 'bar',
        data: this.chartData.map(item => item.totalIncome),
        itemStyle: {
          color: '#5A8DEE'  
        },
        emphasis: {
          itemStyle: {
            color: '#4174D9' 
          }
        }
      }],
      grid: {
        top: '10%',  
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      title: {
        text: title
      }
    };

    this.myChart.setOption(option);
  }

  updateChart(): void {
    const xAxisKey = this.chartData.length > 0 && this.chartData[0]._id.hasOwnProperty('dayOfWeek') ? 'dayOfWeek' : 'month';
    const xAxisLabels = xAxisKey === 'dayOfWeek' ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] : null;

    this.myChart.setOption({
      xAxis: {
        data: xAxisLabels ? this.chartData.map(item => xAxisLabels[item._id[xAxisKey] - 1]) : this.chartData.map(item => `${item._id.month}/${item._id.year}`)
      },
      series: [{
        data: this.chartData.map(item => item.totalIncome)
      }]
    });
  }



  createPieChart(data:any) {
    
    if(this.myChart) {
      this.myChart.dispose();
    }
    
    const chartDom = document.getElementById('myChart') as HTMLDivElement;
    this.myChart = echarts.init(chartDom);


    const options = {
      title:{
        text:'Contract Status',
        left:"center",

      },
      tooltip:{
        trigger:'item',
        // formatter:'{a} <br/>{b} : {c} ({d}%)'
      },

      series:[
        {
          name:'Contracts',
          type:'pie',
          radius:['50%','70%'],
          data:[
            
              { value: data.openContracts, name: 'Open Contracts' },
              { value: data.closedContracts, name: 'Closed Contracts' }    
            
            
          ],
          emphasis:{
            itemStyle:{
              shadowBlur:10,
              shadowOffsetX:0,
              shadowColor:'rgba(0,0,0,0.5)'
            }
          }
        }
      ],
      toolbox: {
        feature: {
          saveAsImage: { show: true, title: 'Save as Image' },
          dataZoom: { show: true, title: 'Data Zoom' },
          dataView: { show: true, title: 'Data View', readOnly: true },
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            title: {
              pie: 'Switch to Pie Chart',
              funnel: 'Switch to Funnel Chart'
            }
          },
          restore: { show: true, title: 'Restore' },
          saveAsPDF: { show: true, title: 'Save as PDF', pixelRatio: 2 }
        }
      
      }
    };

    this.myChart.setOption(options);

  }




  fetchRentedCar(){

    this.chartService.getRentalCarsHistory().subscribe(data => {

      this.rentedCars = JSON.parse(JSON.stringify(data));

      this.createRentedCarChart();

    }
    )
  }

  createRentedCarChart(): void {
    const xAxisData = this.rentedCars.map(item => item.car.model);
const seriesData = this.rentedCars.map(item => item.count);

if (this.myChart) {
  this.myChart.dispose();
}

const chartDom = document.getElementById('myChart') as HTMLDivElement;
this.myChart = echarts.init(chartDom);

const options :  any = {
  title: {
    text: 'Rented Cars By Customers',
    textStyle: {
      fontWeight: 'normal', 
      fontSize: 16,        
      lineHeight: 22        
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Number of Rented'],
    textStyle: {
      fontSize: 12       
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: xAxisData,
    axisLabel: {
      interval: 0,
      rotate: 45,
      textStyle: {
        fontSize: 10 
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      textStyle: {
        fontSize: 12 
      }
    }
  },
  series: [{
    name: 'Number of Rented',
    type: 'line',
    data: seriesData,
    smooth: true,
    symbol: 'circle',
    symbolSize: 8,
    itemStyle: {
      color: '#5A8DEE'
    },
    lineStyle: {
      width: 3
    }
  }],
  animationEasing: 'easeOutQuart', 
  animationDuration: 1000        
};


    this.myChart.setOption(options);
}

  fetchtStatusContract() {
    this.chartService.countStatusContract().subscribe(
      (data) => {
        this.createPieChart(data);
      },
      (error) => {
        console.error('Error fetching contract status report:', error);
      }
    );
  }

  goToDetails(): void {
  }
}
