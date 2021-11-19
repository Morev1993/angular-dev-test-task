import { createAction, props } from '@ngrx/store';
import {City, WeatherForecastItem} from './weather-forecast.models';

export const loadWeatherForecast = createAction('[WeatherForecast] Load');

export const loadWeatherForecastSuccess = createAction(
	'[WeatherForecast/API] Load WeatherForecast Success',
	props<{ weatherForecast: WeatherForecastItem[] }>()
);

export const loadWeatherForecastFailure = createAction(
	'[WeatherForecast/API] Load WeatherForecast Failure',
	props<{ error: any }>()
);

export const loadLocations = createAction('[Locations] Load',
	props<{ query: string }>()
);

export const loadLocationsSuccess = createAction(
	'[Locations] Load Locations Success',
	props<{ currentCity: City }>()
);

export const loadLocationsFailure = createAction(
	'[Locations] Load Locations Failure',
	props<{ error: any }>()
);
