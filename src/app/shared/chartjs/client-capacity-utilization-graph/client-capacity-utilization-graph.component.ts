import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ClientDashboardItem } from 'src/app/core/types/client-dashboard-item.type';
import { GraphComponent } from 'src/app/core/types/graph-component.interface';
import jsonData from 'src/assets/graph-json/client-capacity-utilization.json';

@Component({
  selector: 'app-client-capacity-utilization-graph',
  templateUrl: './client-capacity-utilization-graph.component.html',
  styleUrls: ['./client-capacity-utilization-graph.component.scss'],
})
export class ClientCapacityUtilizationGraphComponent
  implements OnInit, GraphComponent
{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() item: ClientDashboardItem;

  // stacked bar chart
  // x-axis: client
  // y-axis: dollar amount
  // n sections: customer array + unutilized capacity
  // 1 stack: Client Capacity Utilization
  // purpose: Display utilized client capacity per Customer + an unutilized unit.

  stackedBarChartOptions: ChartConfiguration['options'] = {
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
          display: false,
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

  stackedBarChartData: ChartData<'bar'> = {
    labels: jsonData.labels,
    datasets: jsonData.datasets,
  };

  stackedBarChartType: ChartType = 'bar';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.handleExpandSelection();
    this.item.handleExpandSelection = this.handleExpandSelection.bind(this);

    // Force data binding update
    this.changeDetectorRef.detectChanges();
  }

  handleExpandSelection() {
    if (!this.item) return;

    this.stackedBarChartData = this.item.expanded
      ? {
          labels: jsonData.labels,
          datasets: jsonData.datasets,
        }
      : {
          labels: jsonData.labels.slice(0, 2),
          datasets: jsonData.datasets.slice(0, 2),
        };

    // Force data binding update
    this.changeDetectorRef.detectChanges();
  }
}
