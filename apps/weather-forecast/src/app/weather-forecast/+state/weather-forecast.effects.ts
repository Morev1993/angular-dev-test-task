import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as WeatherForecastActions from './weather-forecast.actions';

@Injectable()
export class WeatherForecastEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.init),
			fetch({
				run: action => {
					// Your custom service 'load' logic goes here. For now just return a success action...
					return WeatherForecastActions.loadWeatherForecastSuccess({ weatherForecast: [] });
				},
				onError: (action, error) => {
					console.error('Error', error);
					return WeatherForecastActions.loadWeatherForecastFailure({ error });
				},
			})
		)
	);

	constructor(private readonly actions$: Actions) {}
}
