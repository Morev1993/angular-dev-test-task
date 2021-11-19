import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as WeatherForecastActions from './weather-forecast.actions';
import {catchError, map, of, switchMap} from "rxjs";
import {LocationService} from "../services/location.service";

@Injectable()
export class WeatherForecastEffects {
	loadWeather$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.loadWeatherForecast),
			fetch({
				run: action => {
					// Your custom service 'load' logic goes here. For now just return a success action...
					console.log(action);
					return WeatherForecastActions.loadWeatherForecastSuccess({ weatherForecast: [] });
				},
				onError: (action, error) => {
					console.error('Error', error);
					return WeatherForecastActions.loadWeatherForecastFailure({ error });
				},
			})
		)
	);

	loadCity$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.loadLocations),
			switchMap((action) => this.locationsService.getCities(action.query)
				.pipe(
					map((currentCity) => WeatherForecastActions.loadLocationsSuccess({ currentCity: currentCity as any })),
					catchError(() => of(WeatherForecastActions.loadLocationsFailure({ error: null })))
				)
			),
		)
	);


	constructor(private readonly actions$: Actions, private locationsService: LocationService) {}
}
