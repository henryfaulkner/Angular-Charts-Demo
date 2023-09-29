import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { ChartjsBarComponent } from './shared/chartjs/chartjs-bar/chartjs-bar.component';
import { ChartjsPieComponent } from './shared/chartjs/chartjs-pie/chartjs-pie.component';
import { ChartjsScatterComponent } from './shared/chartjs/chartjs-scatter/chartjs-scatter.component';
import { DropzoneContainerComponent } from './shared/drag-n-drop/photos/dropzone-container/dropzone-container.component';
import { SidebarContainerComponent } from './shared/drag-n-drop/photos/sidebar-container/sidebar-container.component';
import { ChartjsGridComponent } from './shared/drag-n-drop/charts/chartjs-grid/chartjs-grid.component';
import { DragDropGridComponent } from './shared/drag-n-drop/drag-drop-grid/drag-drop-grid.component';
import { DragDropGridCheckboxDropdownComponent } from './shared/drag-n-drop/drag-drop-grid-checkbox-dropdown/drag-drop-grid-checkbox-dropdown.component';

const components = [
  AppComponent,
  ChartjsBarComponent,
  ChartjsPieComponent,
  ChartjsScatterComponent,
  SidebarContainerComponent,
  DropzoneContainerComponent,
  DragDropGridComponent
];
const modules = [
  BrowserModule,
  NgChartsModule,
  HttpClientModule,
  DragDropModule,
];

@NgModule({
  declarations: [...components, ChartjsGridComponent, DragDropGridComponent, DragDropGridCheckboxDropdownComponent],
  imports: [...modules],
  providers: [...components, ...modules],
  bootstrap: [AppComponent],
})
export class AppModule {}
