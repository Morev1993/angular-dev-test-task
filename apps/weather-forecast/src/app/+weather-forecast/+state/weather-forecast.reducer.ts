import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as WeatherForecastActions from './weather-forecast.actions';
import { City, WeatherForecastState, WeatherForecastData, WeatherForecastItem } from './weather-forecast.models';
import {WeatherForecastModes} from "../constants/weather-forecast.constants";

export const WEATHER_FORECAST_FEATURE_KEY = 'weatherForecast';

export interface State extends EntityState<WeatherForecastState> {
	loading: boolean;
	error?: string | null; // last known error (if any)
	currentCity: City;
	data: WeatherForecastData;
	mode: WeatherForecastModes;
}

export interface WeatherForecastPartialState {
	readonly [WEATHER_FORECAST_FEATURE_KEY]: State;
}

export const weatherForecastAdapter: EntityAdapter<WeatherForecastState> =
	createEntityAdapter<WeatherForecastState>();

export const initialState: State = weatherForecastAdapter.getInitialState({
	// set initial required properties
	loading: false,
	mode: WeatherForecastModes.hourly,
	data: {},
	currentCity: {} as City,
});

const weatherTransformer = {
	[WeatherForecastModes.daily]: (items: WeatherForecastItem[]) => {
		return items.map(item => {
			return {
				...item,
				temp: item.temp.day
			}
		})
	},
	[WeatherForecastModes.hourly]: (items: WeatherForecastItem[]) => {
		return items.filter((item, i) => i % 3)
	}
};

const weatherForecastReducer = createReducer(
	initialState,
	on(WeatherForecastActions.loadWeatherForecast, (state, {mode}) => ({ ...state, loading: true, mode, error: null })),
	on(WeatherForecastActions.loadWeatherForecastSuccess, (state, {data}) => {
		const {mode} = state;

		const newState = { ...state, loading: false, data: {
				...state.data,
				mode,
				[mode]: data[mode] }
		};

		Object.keys(newState.data).forEach(key => {
			console.log(key);

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (weatherTransformer[key] && newState.data[key]) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				newState.data[key] = weatherTransformer[key](newState.data[key]);
			}
		});

		return newState;
	}),
	on(WeatherForecastActions.loadWeatherForecastFailure, (state, { error }) => ({ ...state, error, loading: false })),

	on(WeatherForecastActions.loadLocations, state => ({ ...state, error: null })),
	on(WeatherForecastActions.loadLocationsSuccess, (state, {currentCity}) => ({ ...state, loading: false, currentCity: {
		name: currentCity.name,
		lat: currentCity.lat,
		lon: currentCity.lon
	} })),
	on(WeatherForecastActions.loadLocationsFailure, (state, { error }) => ({ ...state, error, loading: false })),
	on(WeatherForecastActions.changeMode, (state, { mode }) => ({ ...state, mode })),
);

export function reducer(state: State | undefined, action: Action) {
	return weatherForecastReducer(state, action);
}

