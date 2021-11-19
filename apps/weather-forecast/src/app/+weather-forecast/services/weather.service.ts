import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherForecastItem} from "../+state/weather-forecast.models";
import {environment} from 'apps/weather-forecast/src/environments/environment';
import {Observable} from "rxjs";

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

	getWeatherHourly(lat: string, lon: string): Observable<WeatherForecastItem[]> {
		return this.http.get<WeatherForecastItem[]>(`${environment.weatherMapBaseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${environment.weatherMapAoiKey}`)
	}

	getWeatherDaily(lat: string, lon: string) {
		return this.http.get<WeatherForecastItem[]>(`${environment.weatherMapBaseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${environment.weatherMapAoiKey}`)
	}
}