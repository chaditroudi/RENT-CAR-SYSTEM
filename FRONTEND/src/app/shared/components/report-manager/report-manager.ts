// report-manager.ts

import { Injectable } from "@angular/core";
import { ReportService } from "../../../core/services/report.service";
import * as echarts from "echarts";

@Injectable({
  providedIn: "root",
})
export class ReportManager {


    
  constructor(private reportService: ReportService) {}

  fetchReports(period: string,startDate,endDate) {
    const data = {
      startDate: startDate, 
      endDate: endDate, 
    };

    let reports$;

    switch (period) {
      case "weekly":
        this.reportService.reportsStatistics(data);
        reports$ = this.reportService.reports$;
        break;
      case "monthly":
        this.reportService.fetchMonthlyReports(data);
        reports$ = this.reportService.reportsMonthly$;
        break;
      case "yearly":
        this.reportService.fetchYearlyReports(data);
        reports$ = this.reportService.reportsYearly$;
        break;
      default:
        throw new Error("Invalid period");
    }

    reports$.subscribe((data) => {
      this.renderECharts(period, data);
    });
  }


  renderECharts(period: string, reports: any[]) {
    const chartElementId = `echarts-container-${period}`;
    const chartElement = document.getElementById(chartElementId);
    const chart = echarts.init(chartElement);

    const chartOptions = {
      xAxis: {
        type: "category",

        data :reports.map((report)=> period === "weekly" ? report.dayOfWeek  :  period === "monthly" ? report.month 
        : period === "yearly" ? report.year : null),
        axisLabel: {
          color: "#333",
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (value) => `$${value.toFixed(2)}`,
          color: "#333",
        },
      },
      series: [
        {
          data: reports.map((report) => report.totalIncome),
          type: "bar",
          name: "Total Income",
          stack: "a",
          label: {
            show: true,
            position: "inside",
            formatter: (params) => `${params.seriesName}: $${params.value.toFixed(2)}`,
            color: "#fff",
          },
          itemStyle: {
            color: period === "weekly" ? "#FF9933" : "#4c38cc",
          },
        },
        {
          data: reports.map((report) => report.totalContracts),
          type: "bar",
          name: "Total Contract",
          stack: "a",
          label: {
            show: true,
            position: "inside",
            formatter: (params) => `${params.seriesName}: ${params.value}`,
            color: "#99CC33",
          },
          itemStyle: {
            color: period === "weekly" ? "#33CCFF" : "#228B22",
          },
        },
      ],
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          let tooltip = `${params[0].seriesName}: $${params[0].value.toFixed(2)}<br>`;
          if (params.length > 1) {
            tooltip += `${params[1].seriesName}: ${params[1].value}`;
          }
          return tooltip;
        },
      },
      legend: {
        data: ["Total Income", "Total Contracts"],
        textStyle: {
          color: "#000",
        },
      },
    };

    chart.setOption(chartOptions);
  }


  async getContractCounts(countContracts) {
         
    const res = await this.reportService.fetchCountContract().toPromise();

    countContracts = res;

    const chartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        left: 'center',
        data: ['Open', 'Closed']
      },
      series: [
        {
          name: 'Contracts',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'outer'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: countContracts['openContracts'], name: 'Contract is Open' },
            { value: countContracts.closedContracts, name: 'Contract is Closed' }
          ]
        }
      ]
    };
    const chart = echarts.init(document.getElementById('contractChart'));
    chart.setOption(chartOption);
  }

}
