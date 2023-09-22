import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActiveAlertCount } from '../types/active-alert-count.type';
import { Area } from '../types/area.type';
import { Region } from '../types/region.type';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  baseUrl = 'https://api.weather.gov/';

  constructor(private httpClient: HttpClient) {}

  async getActiveAlertCountForAllRegions(): Promise<Region[]> {
    const data = await this.getActiveAlertCount();
    const result: Region[] = Object.keys(data.regions).map((key) => {
      return { regionCode: key, regionCount: (data.regions as any)[key] };
    });
    return result;
  }

  async getActiveAlertCountForAllAreas(): Promise<Area[]> {
    const data = await this.getActiveAlertCount();
    console.log('data, ', data);
    const result: Area[] = Object.keys(data.areas).map((key) => {
      return { areaCode: key, areaCount: (data.areas as any)[key] };
    });
    return result;
  }

  private async getActiveAlertCount(): Promise<ActiveAlertCount> {
    const url = `${this.baseUrl}alerts/active/count`;
    const result = firstValueFrom(this.httpClient.get<ActiveAlertCount>(url));
    return result;
  }
}
