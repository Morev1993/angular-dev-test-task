import { createAction, props } from '@ngrx/store';
import {City, WeatherForecastData} from './weather-forecast.models';
import { WeatherForecastModes } from '../constants/weather-forecast.constants';

export const loadWeatherForecast = createAction('[WeatherForecast] Load');

export const loadWeatherForecastSuccess = createAction(
	'[WeatherForecast] Load Success',
	props<{ data: WeatherForecastData }>()
);

export const loadWeatherForecastFailure = createAction(
	'[WeatherForecast] Load Failure',
	props<{ error: any }>()
);

export const changeMode = createAction('[WeatherForecast] ChangeMode',
	props<{ mode: WeatherForecastModes }>()
);


export const loadLocations = createAction('[Locations] Load',
	props<{ query: string }>()
);

export const loadLocationsSuccess = createAction(
	'[Locations] Load Success',
	props<{ currentCity: City }>()
);

export const loadLocationsFailure = createAction(
	'[Locations] Load Failure',
	props<{ error: any }>()
);

