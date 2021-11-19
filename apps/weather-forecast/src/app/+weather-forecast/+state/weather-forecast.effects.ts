import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as WeatherForecastActions from './weather-forecast.actions';
import {catchError, map, of, switchMap, withLatestFrom} from "rxjs";
import {LocationService} from "../services/location.service";
import {WeatherService} from "../services/weather.service";
import {select, Store} from "@ngrx/store";
import * as WeatherForecastSelectors from "./weather-forecast.selectors";
import {WeatherForecastData} from "./weather-forecast.models";

@Injectable()
export class WeatherForecastEffects {
	loadWeather$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.loadWeatherForecast, WeatherForecastActions.loadLocationsSuccess),
			withLatestFrom(this.store.pipe(select(WeatherForecastSelectors.getCity))),
			switchMap(([action, city]) => {
				if (!city) {
					return of(WeatherForecastActions.loadWeatherForecastSuccess({ data: {} as WeatherForecastData }));
				}

				return this.weatherService.getWeatherHourly(city.lat, city.lon)
					.pipe(
						map((data) => WeatherForecastActions.loadWeatherForecastSuccess({ data: data as any })),
						catchError(() => of(WeatherForecastActions.loadWeatherForecastFailure({ error: null })))
					)
				}
			),
		)
	);

	loadCity$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.loadLocations),
			switchMap((action) => this.locationsService.getCities(action.query)
				.pipe(
					map((currentCity) => {
						return WeatherForecastActions.loadLocationsSuccess({ currentCity: currentCity as any });
					}),
					catchError(() => of(WeatherForecastActions.loadLocationsFailure({ error: null })))
				)
			),
		)
	);


	constructor(private readonly actions$: Actions,
				private locationsService: LocationService,
				private weatherService: WeatherService,
				private readonly store: Store
	) {}
}
