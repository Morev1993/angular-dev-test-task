import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEATHER_FORECAST_FEATURE_KEY, State, weatherForecastAdapter } from './weather-forecast.reducer';

// Lookup the 'WeatherForecast' feature state managed by NgRx
export const getWeatherForecastState = createFeatureSelector<State>(WEATHER_FORECAST_FEATURE_KEY);

const { selectAll, selectEntities } = weatherForecastAdapter.getSelectors();

export const getWeatherForecastLoaded = createSelector(getWeatherForecastState, (state: State) => state.loaded);

export const getWeatherForecastError = createSelector(getWeatherForecastState, (state: State) => state.error);

export const getAllWeatherForecast = createSelector(getWeatherForecastState, (state: State) => selectAll(state));

export const getWeatherForecastEntities = createSelector(getWeatherForecastState, (state: State) =>
	selectEntities(state)
);

export const getSelectedId = createSelector(getWeatherForecastState, (state: State) => state.selectedId);

export const getSelected = createSelector(getWeatherForecastEntities, getSelectedId, (entities, selectedId) =>
	selectedId ? entities[selectedId] : undefined
);
