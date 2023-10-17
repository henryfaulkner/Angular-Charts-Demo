import { ChangeDetectorRef, Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ClientDashboardItem } from 'src/app/core/types/client-dashboard-item.type';
import jsonData from 'src/assets/graph-json/credit-request-utilization.json';

@Component({
  selector: 'app-credit-request-utilization',
  templateUrl: './credit-request-utilization.component.html',
  styleUrls: ['./credit-request-utilization.component.scss'],
})
export class CreditRequestUtilizationComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() item: ClientDashboardItem;

  // stacked double bar chart
  // x-axis: customers
  // y-axis: dollar amount
  // 3 sections per customer: utilized, unutilized, pending
  // 2 stacks: utilized/unutilized and pending
  // purpose: Display the utilized, unutilized, and pending customer credit.

  stackedDoubleBarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: jsonData.xTitle,
        },
        stacked: true,
      },
      y: {
        ticks: {
          display: true,
          callback: function (value, index, values) {
            return `$${value}`;
          },
        },
        title: {
          display: true,
          text: jsonData.yTitle,
        },
        stacked: true,
      },
    },
  };

  stackedDoubleBarChartData: ChartData<'bar'> = {
    labels: jsonData.labels,
    datasets: jsonData.datasets,
  };

  stackedDoubleBarChartType: ChartType = 'bar';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Force data binding update
    this.changeDetectorRef.detectChanges();
  }
}
