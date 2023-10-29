import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { default as DatalabelsPlugin } from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { ClientDashboardItem } from 'src/app/core/types/client-dashboard-item.type';
import jsonData from 'src/assets/graph-json/customer-portfolio-portions.json';

@Component({
  selector: 'app-customer-portfolio-portions-graph',
  templateUrl: './customer-portfolio-portions-graph.component.html',
  styleUrls: ['./customer-portfolio-portions-graph.component.scss'],
})
export class CustomerPortfolioPortionsGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() item: ClientDashboardItem;
  @Input() isDialog: boolean = false;

  // pie chart
  // x-axis: customers
  // y-axis: Per Customer Portion of total Customer Portfolio
  // purpose: Display customer portfolio's customer importance by gross throughput percentage.

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            console.log(
              'ctx.chart.data.labels[ctx.dataIndex], ',
              ctx.chart.data.labels[ctx.dataIndex]
            );
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

  pieChartPlugins = [DatalabelsPlugin];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.pieChartOptions.plugins.legend.display = this.isDialog;
    // Force data binding update
    this.changeDetectorRef.detectChanges();
  }
}
