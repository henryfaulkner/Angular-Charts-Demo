import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import jsonData from 'src/assets/graph-json/customer-portfolio-portions.json';

@Component({
  selector: 'app-customer-portfolio-portions-graph',
  templateUrl: './customer-portfolio-portions-graph.component.html',
  styleUrls: ['./customer-portfolio-portions-graph.component.scss'],
})
export class CustomerPortfolioPortionsGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // pie chart
  // x-axis: customers
  // y-axis: Per Customer Portion of total Customer Portfolio
  // purpose: Display customer portfolio's customer importance by gross throughput percentage.

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  pieChartType: ChartType = 'pie';
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: jsonData.labels,
    datasets: jsonData.datasets,
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Force data binding update
    this.changeDetectorRef.detectChanges();
  }
}
