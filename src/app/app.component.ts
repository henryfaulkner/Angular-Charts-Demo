import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from './core/services/weather-data.service';
import { Area } from './core/types/area.type';
import { ChartComponentProps } from './core/types/chart-component-props.type';
import { ChartDatasetVectorAndLabel } from './core/types/chart-dataset-vector-and-label.type';
import { Region } from './core/types/region.type';
import { handleExpandReduceChartData } from './core/ui-helpers/handle-expand-reduce-chart-data.func';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    
  }
}
