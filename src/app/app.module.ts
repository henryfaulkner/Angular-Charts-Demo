import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { ChartjsBarComponent } from './shared/chartjs/chartjs-bar/chartjs-bar.component';
import { ChartjsPieComponent } from './shared/chartjs/chartjs-pie/chartjs-pie.component';
import { ChartjsScatterComponent } from './shared/chartjs/chartjs-scatter/chartjs-scatter.component';

const components = [
  AppComponent,
  ChartjsBarComponent,
  ChartjsPieComponent,
  ChartjsScatterComponent,
];
const modules = [BrowserModule, NgChartsModule, HttpClientModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...components, ...modules],
  bootstrap: [AppComponent],
})
export class AppModule {}
