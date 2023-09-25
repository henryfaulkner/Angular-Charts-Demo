import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from './core/services/weather-data.service';
import { Area } from './core/types/area.type';
import { ChartDatasetVectorAndLabel } from './core/types/chart-dataset-vector-and-label.type';
import { Region } from './core/types/region.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular Charts Demo';

  regionChartLabels: string[] = [];
  regionChartDatasets: ChartDatasetVectorAndLabel[] = [];
  areaChartLabels: string[] = [];
  areaChartDatasets: ChartDatasetVectorAndLabel[] = [];

  constructor(private wds: WeatherDataService) {}

  async ngOnInit() {
    const regionData: Region[] =
      await this.wds.getActiveAlertCountForAllRegions();
    const areaData: Area[] = await this.wds.getActiveAlertCountForAllAreas();
    const regionLabels: string[] = regionData.map((x) => x.regionCode);
    const regionDatasetVector: number[] = regionData.map((x) => x.regionCount);
    const areaLabels: string[] = areaData.map((x) => x.areaCode);
    const areaDatasetVector: number[] = areaData.map((x) => x.areaCount);

    this.regionChartLabels = regionLabels;
    this.regionChartDatasets = [
      { data: regionDatasetVector, label: 'Region Alert Counts' },
    ];

    this.areaChartLabels = areaLabels;
    this.areaChartDatasets = [
      { data: areaDatasetVector, label: 'Area Alert Counts' },
    ];
  }
}
