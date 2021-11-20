import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as WeatherForecastActions from './weather-forecast.actions';
import {catchError, map, of, switchMap, withLatestFrom} from "rxjs";
import {LocationService} from "../services/location.service";
import {WeatherService} from "../services/weather.service";
import {select, Store} from "@ngrx/store";
import * as WeatherForecastSelectors from "./weather-forecast.selectors";
import { selectQueryParams } from '../../router.selectors';

@Injectable()
export class WeatherForecastEffects {
	loadWeather$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				WeatherForecastActions.loadWeatherForecast,
				WeatherForecastActions.changeMode
			),
			withLatestFrom(
				this.store.pipe(select(WeatherForecastSelectors.getWeatherForecastStateData)),
			),

			switchMap(([, state]) => {
				const {currentCity, data, mode} = state;

				if (!currentCity) {
					return of(WeatherForecastActions.loadWeatherForecastSuccess({ data: {} }));
				}

				const {lat, lon} = currentCity;


				if (data[mode]) {
					return of(WeatherForecastActions.loadWeatherForecastSuccess({ data }));
				}

				return this.weatherService.getWeather(lat, lon, mode)
					.pipe(
						map((data) => {
							return WeatherForecastActions.loadWeatherForecastSuccess({
								data,
							});
						}),
						catchError(() => of(WeatherForecastActions.loadWeatherForecastFailure({ error: null })))
					)
			}),
		)
	);

	triggerLoadWeather$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				WeatherForecastActions.loadLocationsSuccess,
			),
			withLatestFrom(this.store.pipe(select(selectQueryParams))),
			map(([, queryParams]) => {
				const { mode } = queryParams;

				return WeatherForecastActions.loadWeatherForecast({mode})
			}),
		)
	);

	loadCity$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.loadLocations),
			withLatestFrom(this.store.pipe(select(selectQueryParams))),
			switchMap(([action, queryParams]) => {
				return this.locationsService.getCities(action.query || queryParams.city)
					.pipe(
						map((currentCity) => {
							const city = currentCity || {};
							return WeatherForecastActions.loadLocationsSuccess({ currentCity: city });
						}),
						catchError(() => of(WeatherForecastActions.loadLocationsFailure({ error: null })))
					)
			}),
		)
	);


	constructor(
		private readonly actions$: Actions,
		private locationsService: LocationService,
		private weatherService: WeatherService,
		private readonly store: Store
	) {}
}
