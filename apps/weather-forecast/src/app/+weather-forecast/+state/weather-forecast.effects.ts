import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as WeatherForecastActions from './weather-forecast.actions';
import {catchError, map, of, switchMap, withLatestFrom} from "rxjs";
import {LocationService} from "../services/location.service";
import {WeatherService} from "../services/weather.service";
import {select, Store} from "@ngrx/store";
import * as WeatherForecastSelectors from "./weather-forecast.selectors";
import { selectQueryParams } from '../../router.selectors';
import { WeatherForecastModes } from '../constants/weather-forecast.constants';

@Injectable()
export class WeatherForecastEffects {
	loadWeather$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				WeatherForecastActions.loadWeatherForecast,
				WeatherForecastActions.loadLocationsSuccess,
				WeatherForecastActions.changeMode
			),
			withLatestFrom(
				this.store.pipe(select(WeatherForecastSelectors.getWeatherForecastStateData)),
				this.store.pipe(select(selectQueryParams))
			),

			switchMap(([, state, queryParams]) => {
				const {currentCity, data} = state;

				if (!currentCity) {
					return of(WeatherForecastActions.loadWeatherForecastSuccess({ data: {} }));
				}

				const {lat, lon} = currentCity;
				const mode = !queryParams.mode ? state.mode : queryParams.mode as WeatherForecastModes;

				if (data[mode]) {
					return of(WeatherForecastActions.loadWeatherForecastSuccess({ data }));
				}

				return this.weatherService.getWeather(lat, lon, mode)
					.pipe(
						map((data) => WeatherForecastActions.loadWeatherForecastSuccess({
							data
						})),
						catchError(() => of(WeatherForecastActions.loadWeatherForecastFailure({ error: null })))
					)
			}),
		)
	);

	loadCity$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.loadLocations),
			withLatestFrom(this.store.pipe(select(selectQueryParams))),
			switchMap(([action, queryParams]) => {
				console.log('queryParams', queryParams);
				return this.locationsService.getCities(action.query || queryParams.city)
					.pipe(
						map((currentCity) => {
							return WeatherForecastActions.loadLocationsSuccess({ currentCity });
						}),
						catchError(() => of(WeatherForecastActions.loadLocationsFailure({ error: null })))
					)
				}
			),
		)
	);


	constructor(
		private readonly actions$: Actions,
		private locationsService: LocationService,
		private weatherService: WeatherService,
		private readonly store: Store
	) {}
}
