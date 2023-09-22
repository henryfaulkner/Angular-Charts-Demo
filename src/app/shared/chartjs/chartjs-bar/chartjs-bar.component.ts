import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherDataService } from 'src/app/core/services/weather-data.service';
import { Region } from 'src/app/core/types/region.type';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Area } from 'src/app/core/types/area.type';

@Component({
  selector: 'app-chartjs-bar',
  templateUrl: './chartjs-bar.component.html',
  styleUrls: ['./chartjs-bar.component.scss'],
})
export class ChartjsBarComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.

    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  constructor(private wds: WeatherDataService) {}

  async ngOnInit(): Promise<void> {
    const regionData: Region[] =
      await this.wds.getActiveAlertCountForAllRegions();
    const areaData: Area[] = await this.wds.getActiveAlertCountForAllAreas();
    const labels: string[] = regionData.map((x) => x.regionCode);
    const regionDataset: number[] = regionData.map((x) => x.regionCount);
    const areaDataset: number[] = areaData.map((x) => x.areaCount);
    this.barChartData = {
      labels,
      datasets: [{ data: regionDataset, label: 'Region Dataset' }],
    };
  }
}
