import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from './core/services/weather-data.service';
import { Area } from './core/types/area.type';
import { ChartDatasetVectorAndLabel } from './core/types/chart-dataset-vector-and-label.type';
import { Photo } from './core/types/photo.type';
import { Region } from './core/types/region.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular Charts Demo';

  barChartLabels: string[] = [];
  barChartDatasets: ChartDatasetVectorAndLabel[] = [];

  photos: Photo[] = [];

  constructor(private wds: WeatherDataService, private http: HttpClient) {}

  async ngOnInit() {
    const regionData: Region[] =
      await this.wds.getActiveAlertCountForAllRegions();
    const areaData: Area[] = await this.wds.getActiveAlertCountForAllAreas();
    const regionLabels: string[] = regionData.map((x) => x.regionCode);
    const regionDatasetVector: number[] = regionData.map((x) => x.regionCount);
    const areaLabels: string[] = areaData.map((x) => x.areaCode);
    const areaDatasetVector: number[] = areaData.map((x) => x.areaCount);

    this.barChartLabels = regionLabels;
    this.barChartDatasets = [
      { data: regionDatasetVector, label: 'Region Alert Counts' },
    ];
  }
}
