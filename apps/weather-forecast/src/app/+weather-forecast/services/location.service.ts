import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {City} from "../+state/weather-forecast.models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

	getCities(query: string): Observable<City> {
		return this.http.get<City[]>(`${environment.weatherMapBaseUrl}/geo/1.0/direct?q=${query}&limit=1&appid=${environment.weatherMapAoiKey}`).pipe(
			map((locations) => locations[0]),
			catchError((e) => {
				return throwError(e);
			})
		)
	}
}
