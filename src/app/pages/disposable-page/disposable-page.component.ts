import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../core/services/weather-data.service';
import { Area } from '../../core/types/area.type';
import { ChartComponentProps } from '../../core/types/chart-component-props.type';
import { ChartDatasetVectorAndLabel } from '../../core/types/chart-dataset-vector-and-label.type';
import { Region } from '../../core/types/region.type';
import { handleExpandReduceChartData } from '../../core/ui-helpers/handle-expand-reduce-chart-data.func';

@Component({
  selector: 'app-disposable-page',
  templateUrl: './disposable-page.component.html',
  styleUrls: ['./disposable-page.component.scss']
})
export class DisposablePageComponent implements OnInit {
  title = 'Angular Charts Demo';

  regionChartLabels: string[] = [];
  regionChartDatasets: ChartDatasetVectorAndLabel[] = [];
  areaChartLabels: string[] = [];
  areaChartDatasets: ChartDatasetVectorAndLabel[] = [];

  gridItems: ChartComponentProps[] = [];

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

    this.PopulateGridItems();
  }

  PopulateGridItems() {
    const reducedAreaChartLabels = this.areaChartLabels.slice(0, 5);
    const reducedAreaChartDatasets = this.areaChartDatasets.slice(0, 5);

    this.gridItems = [
      {
        id: '1',
        title: '1',
        type: 'bar',
        labels: this.areaChartLabels,
        displayLabels: reducedAreaChartLabels,
        datasets: this.areaChartDatasets,
        displayDatasets: reducedAreaChartDatasets,
        selected: true,
        expanded: false,
        handleExpandSelection: handleExpandReduceChartData,
      },
      {
        id: '2',
        title: '2',
        type: 'bar',
        labels: this.areaChartLabels,
        displayLabels: reducedAreaChartLabels,
        datasets: this.areaChartDatasets,
        displayDatasets: reducedAreaChartDatasets,
        selected: true,
        expanded: false,
        handleExpandSelection: handleExpandReduceChartData,
      },
      {
        id: '3',
        title: '3',
        type: 'bar',
        labels: this.areaChartLabels,
        displayLabels: reducedAreaChartLabels,
        datasets: this.areaChartDatasets,
        displayDatasets: reducedAreaChartDatasets,
        selected: true,
        expanded: false,
        handleExpandSelection: handleExpandReduceChartData,
      },
      {
        id: '4',
        title: '4',
        type: 'bar',
        labels: this.areaChartLabels,
        displayLabels: reducedAreaChartLabels,
        datasets: this.areaChartDatasets,
        displayDatasets: reducedAreaChartDatasets,
        selected: true,
        expanded: false,
        handleExpandSelection: handleExpandReduceChartData,
      },
      {
        id: '5',
        title: '5',
        type: 'pie',
        labels: this.regionChartLabels,
        displayLabels: this.regionChartLabels,
        datasets: this.regionChartDatasets,
        displayDatasets: this.regionChartDatasets,
        selected: true,
        expanded: false,
        handleExpandSelection: (item: ChartComponentProps) => {},
      },
      {
        id: '6',
        title: '6',
        type: 'bar',
        labels: this.areaChartLabels,
        displayLabels: reducedAreaChartLabels,
        datasets: this.areaChartDatasets,
        displayDatasets: reducedAreaChartDatasets,
        selected: true,
        expanded: false,
        handleExpandSelection: handleExpandReduceChartData,
      },
      {
        id: '7',
        title: '7',
        type: 'pie',
        labels: this.regionChartLabels,
        displayLabels: this.regionChartLabels,
        datasets: this.regionChartDatasets,
        displayDatasets: this.regionChartDatasets,
        selected: true,
        expanded: false,
        handleExpandSelection: (item: ChartComponentProps) => {},
      },
      {
        id: '8',
        title: '8',
        type: 'pie',
        labels: this.regionChartLabels,
        displayLabels: this.regionChartLabels,
        datasets: this.regionChartDatasets,
        displayDatasets: this.regionChartDatasets,
        selected: true,
        expanded: false,
        handleExpandSelection: (item: ChartComponentProps) => {},
      },
      {
        id: '9',
        title: '9',
        type: 'pie',
        labels: this.regionChartLabels,
        displayLabels: this.regionChartLabels,
        datasets: this.regionChartDatasets,
        displayDatasets: this.regionChartDatasets,
        selected: true,
        expanded: false,
        handleExpandSelection: (item: ChartComponentProps) => {},
      },
    ];
  }
}
