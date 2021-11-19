import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEATHER_FORECAST_FEATURE_KEY, State, weatherForecastAdapter } from './weather-forecast.reducer';

// Lookup the 'WeatherForecast' feature state managed by NgRx
export const getWeatherForecastState = createFeatureSelector<State>(WEATHER_FORECAST_FEATURE_KEY);

const { selectAll, selectEntities } = weatherForecastAdapter.getSelectors();

export const getWeatherForecastLoading = createSelector(getWeatherForecastState, (state: State) => state.loading);

export const getWeatherForecastError = createSelector(getWeatherForecastState, (state: State) => state.error);

export const getAllWeatherForecast = createSelector(getWeatherForecastState, (state: State) => selectAll(state));

export const getWeatherForecastEntities = createSelector(getWeatherForecastState, (state: State) =>
	selectEntities(state)
);

export const getCity = createSelector(getWeatherForecastState, (state: State) =>
	state.currentCity
);