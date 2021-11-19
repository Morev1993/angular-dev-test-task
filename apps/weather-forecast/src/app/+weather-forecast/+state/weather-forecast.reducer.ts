import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as WeatherForecastActions from './weather-forecast.actions';
import {City, WeatherForecastState, WeatherForecastData} from './weather-forecast.models';
import {WeatherForecastMode} from "../constants/weather-forecast.constants";

export const WEATHER_FORECAST_FEATURE_KEY = 'weatherForecast';

export interface State extends EntityState<WeatherForecastState> {
	loading: boolean;
	error?: string | null; // last known error (if any)
	currentCity: City;
	data: WeatherForecastData;
}

export interface WeatherForecastPartialState {
	readonly [WEATHER_FORECAST_FEATURE_KEY]: State;
}

export const weatherForecastAdapter: EntityAdapter<WeatherForecastState> =
	createEntityAdapter<WeatherForecastState>();

export const initialState: State = weatherForecastAdapter.getInitialState({
	// set initial required properties
	loading: false,
	mode: WeatherForecastMode.HOURLY,
	data: {} as WeatherForecastData,
	currentCity: {} as City,
});

const weatherForecastReducer = createReducer(
	initialState,
	on(WeatherForecastActions.loadWeatherForecast, state => ({ ...state, loading: true, error: null })),
	on(WeatherForecastActions.loadWeatherForecastSuccess, (state, {data}) => ({ ...state, loading: false, data })),
	on(WeatherForecastActions.loadWeatherForecastFailure, (state, { error }) => ({ ...state, error, loading: false })),

	on(WeatherForecastActions.loadLocations, state => ({ ...state, error: null })),
	on(WeatherForecastActions.loadLocationsSuccess, (state, {currentCity}) => ({ ...state, loading: false, currentCity })),
	on(WeatherForecastActions.loadLocationsFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

export function reducer(state: State | undefined, action: Action) {
	return weatherForecastReducer(state, action);
}
