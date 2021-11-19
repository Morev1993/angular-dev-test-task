import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherForecastData} from "../+state/weather-forecast.models";
import {environment} from 'apps/weather-forecast/src/environments/environment';
import { WeatherForecastModes } from '../constants/weather-forecast.constants';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  	getWeather(lat: string, lon: string, mode: WeatherForecastModes) {
  		const presets = 'current,minutely,daily,hourly,alerts'.split(',').filter(item => item !== mode).join(',');

		return this.http.get<WeatherForecastData>(`${environment.weatherMapBaseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${presets}&appid=${environment.weatherMapAoiKey}`)
	}
}
