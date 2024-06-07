import { ReportService } from "./../../core/services/report.service";

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import {  Router } from "@angular/router";

import {ReportManager} from "src/app/shared/components/report-manager/report-manager";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit, AfterViewInit {
  reports: any[] = [];
  carsRented: any[] = [];
  carsA: any[] = [];
  monthlyRep: any[] = [];

  isFilter: boolean = false;

  startDate: string; 
  endDate: string; 
  weeklyReports: any[] = [];
  monthlyReports: any[] = [];
  yearlyReports: any[] = [];
  chartOption: any;
  countContracts :any;

  

  @ViewChild("weeklyChartContainer") weeklyChartContainer: ElementRef;
  @ViewChild("monthlyChartContainer") monthlyChartContainer: ElementRef;
  @ViewChild("yearlyChartContainer") yearlyChartContainer: ElementRef;

  constructor(private reportService: ReportService,
    
    
    private router: Router, private reportManager:ReportManager) {}
  ngAfterViewInit(): void {
    this.fetchWeeklyReports();
    this.fetchMonthlyReports();
    this.fetchYearlyReports();
  }





  ngOnInit(): void {
    
    this.initDate();
    this.reportManager.getContractCounts(this.countContracts);
    this.fetchWeeklyReports();
    this.fetchMonthlyReports();

   // this.fetchReports();

 
  }

  initDate() {
    this.startDate = this.getFormattedDateTime(new Date());
    this.endDate = this.getFormattedDateTime(new Date());
  }








  // fetchReports() {
  //   this.reportService.fetchAllreports();

  //   this.reportService.reports$.subscribe((data: any) => {
  //     this.reports = data;

  //     this.carsRented = data.rentedCars || [];
  //     this.carsA = data.availableCars || [];
  //   });
  // }

  // goToDetails() {
  //   this.router.navigate(["modules/cars/car-details"]);
  // }

  // fetchWeeklyReports() {
  //   const data = {
  //     startDate: this.startDate,
  //     endDate: this.endDate,
  //   };
  //   this.reportService.reportsStatistics(data);

  //   this.reportService.reports$.subscribe((data: any) => {
  //     this.weeklyReports = data;
  //     this.renderECharts();
  //   });
  // }

  // fetchMonthlyReports() {
  //   const data = {
  //     startDate: this.startDate,
  //     endDate: this.endDate,
  //   };
  //   this.reportService.fetchMonthlyReports(data);

  //   this.reportService.reportsMonthly$.subscribe((data: any) => {
  //     this.monthlyReports = data;
  //     this.renderEChartsReportMonthly();
  //   });
  // }

  // fetchYearlyReports() {
  //   const data = {
  //     startDate: this.startDate,
  //     endDate: this.endDate,
  //   };
  //   this.reportService.fetchYearlyReports(data);

  //   this.reportService.reportsYearly$.subscribe((data: any) => {
  //     this.yearlyReports = data;
  //     this.renderEChartsReportYearly();
  //   });
  // }

  // renderEChartsReportMonthly() {
  //   const chartElement1 = document.getElementById("echarts-container-monthly");
  //   const chart1 = echarts.init(chartElement1);

  //   const chartOptions1 = {
  //     xAxis: {
  //       type: "category",
  //       data: this.monthlyReports.map((report) => report.month), // Extract dayOfWeek from each report
  //       axisLabel: {
  //         color: "#333", // Set axis label color
  //       },
  //     },
  //     yAxis: {
  //       type: "value",
  //       axisLabel: {
  //         formatter: (value) => `$${value.toFixed(2)}`, // Format y-axis labels with currency symbol
  //         color: "#333", // Set axis label color
  //       },
  //     },
  //     series: [
  //       {
  //         data: this.monthlyReports.map((report) => report.totalIncome),
  //         type: "bar",
  //         name: "Total Income",
  //         stack: "a", // Stack bars for better comparison (optional)
  //         label: {
  //           show: true,
  //           position: "inside",
  //           formatter: (params) =>
  //             `${params.seriesName}: $${params.value.toFixed(2)}`,
  //           color: "#fff", // Set label text color to white
  //         },
  //         itemStyle: {
  //           // Style the bars
  //           color: "#38cc4c", // Set bar color
  //         },
  //       },
  //       {
  //         data: this.monthlyReports.map((report) => report.totalContracts),
  //         type: "bar",
  //         name: "Total Contract",
  //         stack: "a", // Stack bars for better comparison (optional)
  //         label: {
  //           show: true,
  //           position: "inside",
  //           formatter: (params) => `${params.seriesName}: ${params.value}`,
  //           color: "#99CC33", // Set label text color to white
  //         },
  //         itemStyle: {
  //           // Style the bars
  //           color: "#228B22", // Set bar color
  //         },
  //       },
  //     ],
  //     grid: {
  //       // Configure grid area
  //       left: "3%",
  //       right: "4%",
  //       bottom: "3%",
  //       containLabel: true, // Adjust to avoid overlapping labels
  //     },
  //     tooltip: {
  //       // Add tooltip for data point hover
  //       trigger: "axis",
  //       formatter: (params) => {
  //         let tooltip = `${params[0].seriesName}: $${params[0].value.toFixed(
  //           2
  //         )}<br>`;
  //         if (params.length > 1) {
  //           // Handle multiple stacked bars
  //           tooltip += `${params[1].seriesName}: ${params[1].value}`;
  //         }
  //         return tooltip;
  //       },
  //     },
  //     legend: {
  //       // Include legend for clarity
  //       data: ["Total Income", "Total Contracts"],
  //       textStyle: {
  //         color: "#000",
  //       },
  //     },
  //   };

  //   // Set chart options and render chart
  //   chart1.setOption(chartOptions1);
  // }
  // renderEChartsReportYearly() {
  //   const chartElement1 = document.getElementById("echarts-container-yearly");
  //   const chart1 = echarts.init(chartElement1);

  //   const chartOptions1 = {
  //     xAxis: {
  //       type: "category",
  //       data: this.yearlyReports.map((report) => report.year), // Extract dayOfWeek from each report
  //       axisLabel: {
  //         color: "#333", // Set axis label color
  //       },
  //     },
  //     yAxis: {
  //       type: "value",
  //       axisLabel: {
  //         formatter: (value) => `$${value.toFixed(2)}`, // Format y-axis labels with currency symbol
  //         color: "#333", // Set axis label color
  //       },
  //     },
  //     series: [
  //       {
  //         data: this.yearlyReports.map((report) => report.totalIncome),
  //         type: "bar",
  //         name: "Total Income",
  //         stack: "a", // Stack bars for better comparison (optional)
  //         label: {
  //           show: true,
  //           position: "inside",
  //           formatter: (params) =>
  //             `${params.seriesName}: $${params.value.toFixed(2)}`,
  //           color: "#fff", // Set label text color to white
  //         },
  //         itemStyle: {
  //           // Style the bars
  //           color: "#4c38cc", // Set bar color
  //         },
  //       },
  //       {
  //         data: this.yearlyReports.map((report) => report.totalContracts),
  //         type: "bar",
  //         name: "Total Contract",
  //         stack: "a", // Stack bars for better comparison (optional)
  //         label: {
  //           show: true,
  //           position: "inside",
  //           formatter: (params) => `${params.seriesName}: ${params.value}`,
  //           color: "#99CC33", // Set label text color to white
  //         },
  //         itemStyle: {
  //           // Style the bars
  //           color: "#228B22", // Set bar color
  //         },
  //       },
  //     ],
  //     grid: {
  //       // Configure grid area
  //       left: "3%",
  //       right: "4%",
  //       bottom: "3%",
  //       containLabel: true, // Adjust to avoid overlapping labels
  //     },
  //     tooltip: {
  //       // Add tooltip for data point hover
  //       trigger: "axis",
  //       formatter: (params) => {
  //         let tooltip = `${params[0].seriesName}: $${params[0].value.toFixed(
  //           2
  //         )}<br>`;
  //         if (params.length > 1) {
  //           // Handle multiple stacked bars
  //           tooltip += `${params[1].seriesName}: ${params[1].value}`;
  //         }
  //         return tooltip;
  //       },
  //     },
  //     legend: {
  //       // Include legend for clarity
  //       data: ["Total Income", "Total Contracts"],
  //       textStyle: {
  //         color: "#000",
  //       },
  //     },
  //   };

  //   // Set chart options and render chart
  //   chart1.setOption(chartOptions1);
  // }

  // renderECharts() {
  //   const chartElement = document.getElementById("echarts-container-weekly");
  //   const chart = echarts.init(chartElement);

  //   const chartOptions = {
  //     xAxis: {
  //       type: "category",
  //       data: this.weeklyReports.map((report) => report.dayOfWeek), // Extract dayOfWeek from each report
  //       axisLabel: {
  //         color: "#333", // Set axis label color
  //       },
  //     },
  //     yAxis: {
  //       type: "value",
  //       axisLabel: {
  //         formatter: (value) => `$${value.toFixed(2)}`, // Format y-axis labels with currency symbol
  //         color: "#333", // Set axis label color
  //       },
  //     },
  //     series: [
  //       {
  //         data: this.weeklyReports.map((report) => report.totalIncome),
  //         type: "bar",
  //         name: "Total Income",
  //         stack: "a", // Stack bars for better comparison (optional)
  //         label: {
  //           show: true,
  //           position: "inside",
  //           formatter: (params) =>
  //             `${params.seriesName}: $${params.value.toFixed(2)}`,
  //           color: "#fff", // Set label text color to white
  //         },
  //         itemStyle: {
  //           // Style the bars
  //           color: "#FF9933", // Set bar color
  //         },
  //       },
  //       {
  //         data: this.weeklyReports.map((report) => report.totalContracts),
  //         type: "bar",
  //         name: "Total Contract",
  //         stack: "a", // Stack bars for better comparison (optional)
  //         label: {
  //           show: true,
  //           position: "inside",
  //           formatter: (params) => `${params.seriesName}: ${params.value}`,
  //           color: "#99CC33", // Set label text color to white
  //         },
  //         itemStyle: {
  //           // Style the bars
  //           color: "#33CCFF", // Set bar color
  //         },
  //       },
  //     ],
  //     grid: {
  //       // Configure grid area
  //       left: "3%",
  //       right: "4%",
  //       bottom: "3%",
  //       containLabel: true, // Adjust to avoid overlapping labels
  //     },
  //     tooltip: {
  //       // Add tooltip for data point hover
  //       trigger: "axis",
  //       formatter: (params) => {
  //         let tooltip = `${params[0].seriesName}: $${params[0].value.toFixed(
  //           2
  //         )}<br>`;
  //         if (params.length > 1) {
  //           // Handle multiple stacked bars
  //           tooltip += `${params[1].seriesName}: ${params[1].value}`;
  //         }
  //         return tooltip;
  //       },
  //     },
  //     legend: {
  //       data: ["Total Income", "Total Contracts"],
  //       textStyle: {
  //         color: "#000",
  //       },
  //     },
  //   };

  //   // Set chart options and render chart
  //   chart.setOption(chartOptions);
  // }





  fetchWeeklyReports() {
    
    this.reportManager.fetchReports("weekly",this.startDate,this.endDate);
  }

  fetchMonthlyReports() {
    this.reportManager.fetchReports("monthly",this.startDate,this.endDate);
  }

  fetchYearlyReports() {
    this.reportManager.fetchReports("yearly",this.startDate,this.endDate);
  }









  // Helper function to format date-time to string compatible with datetime-local input
  private getFormattedDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Helper function to pad zero to single-digit numbers
  private padZero(num: number): string {
    return num < 10 ? "0" + num : num.toString();
  }
}
