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
import { formatLabel } from 'src/app/core/ui-helpers/format-label.func';
import jsonData from 'src/assets/graph-json/flagged-invoice-count.json';

@Component({
  selector: 'app-flagged-invoice-count-graph',
  templateUrl: './flagged-invoice-count-graph.component.html',
  styleUrls: ['./flagged-invoice-count-graph.component.scss'],
})
export class FlaggedInvoiceCountGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() item: ClientDashboardItem;

  // scatterplot
  // x-axis: invoice files
  // y-axis: flag types
  // purpose: Display the flag types currently assigned to active invoices.

  scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: true,
          stepSize: 1,
          callback: function (value, index, values) {
            // set string labels to index
            return jsonData.xLabels[index];
          },
        },
        title: {
          display: true,
          text: jsonData.xTitle,
        },
      },
      y: {
        afterFit: function (scaleInstance) {
          scaleInstance.width = 100; // sets the width to 100px
        },
        ticks: {
          display: true,
          stepSize: 1,
          callback: function (value, index, values) {
            // set string labels to index
            const yLabel: string = jsonData.yLabels[index];
            return formatLabel(yLabel, 15);
          },
        },
        title: {
          display: true,
          text: jsonData.yTitle,
        },
      },
    },
  };

  scatterChartData: ChartData<'scatter'> = {
    datasets: [
      {
        data: jsonData.datasets[0].data.map(
          (strPoint: { x: string; y: string }) => {
            // index labels
            return {
              x: jsonData.xLabels.indexOf(strPoint.x),
              y: jsonData.yLabels.indexOf(strPoint.y),
            };
          }
        ),
        pointRadius: 8,
        pointHoverRadius: 10,
      },
    ],
  };

  scatterChartLabels: ChartConfiguration['data']['labels'] = ['pizza'];

  scatterChartType: ChartType = 'scatter';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Force data binding update
    this.changeDetectorRef.detectChanges();
  }
}
