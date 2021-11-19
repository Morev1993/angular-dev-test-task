import { createAction, props } from '@ngrx/store';
import { WeatherForecastEntity } from './weather-forecast.models';

export const init = createAction('[WeatherForecast Page] Init');

export const loadWeatherForecastSuccess = createAction(
	'[WeatherForecast/API] Load WeatherForecast Success',
	props<{ weatherForecast: WeatherForecastEntity[] }>()
);

export const loadWeatherForecastFailure = createAction(
	'[WeatherForecast/API] Load WeatherForecast Failure',
	props<{ error: any }>()
);
