import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as WeatherForecastActions from './weather-forecast.actions';
import { WeatherForecastEntity } from './weather-forecast.models';

export const WEATHER_FORECAST_FEATURE_KEY = 'weatherForecast';

export interface State extends EntityState<WeatherForecastEntity> {
	selectedId?: string | number; // which WeatherForecast record has been selected
	loaded: boolean; // has the WeatherForecast list been loaded
	error?: string | null; // last known error (if any)
}

export interface WeatherForecastPartialState {
	readonly [WEATHER_FORECAST_FEATURE_KEY]: State;
}

export const weatherForecastAdapter: EntityAdapter<WeatherForecastEntity> =
	createEntityAdapter<WeatherForecastEntity>();

export const initialState: State = weatherForecastAdapter.getInitialState({
	// set initial required properties
	loaded: false,
});

const weatherForecastReducer = createReducer(
	initialState,
	on(WeatherForecastActions.init, state => ({ ...state, loaded: false, error: null })),
	on(WeatherForecastActions.loadWeatherForecastSuccess, (state, { weatherForecast }) =>
		weatherForecastAdapter.setAll(weatherForecast, { ...state, loaded: true })
	),
	on(WeatherForecastActions.loadWeatherForecastFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
	return weatherForecastReducer(state, action);
}
