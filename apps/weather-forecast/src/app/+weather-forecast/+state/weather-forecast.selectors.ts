import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEATHER_FORECAST_FEATURE_KEY, State } from './weather-forecast.reducer';
import { WeatherForecastModes } from '../constants/weather-forecast.constants';
import { WeatherForecastItem } from './weather-forecast.models';

const weatherTransformer = {
	[WeatherForecastModes.daily]: (items: WeatherForecastItem[]) => {
		return items.map(item => {
			return {
				...item,
				temp: item.temp.day ? item.temp.day : item.temp
			}
		})
	},
	[WeatherForecastModes.hourly]: (items: WeatherForecastItem[]) => {
		return items.filter((item, i) => i % 3 && i).slice(0, 8)
	}
};

export const getWeatherForecastState = createFeatureSelector<State>(WEATHER_FORECAST_FEATURE_KEY);

export const getWeatherForecastStateData = createSelector(getWeatherForecastState, (state: State) => state);

export const getWeatherForecastError = createSelector(getWeatherForecastState, (state: State) => state.error);

export const getAllWeatherItems = createSelector(getWeatherForecastState, (state: State) => {
	const newState = JSON.parse(JSON.stringify(state));
	Object.keys(newState.data).forEach((key: string) => {

		if (weatherTransformer[key as WeatherForecastModes] && newState.data[key]) {
			newState.data[key] = weatherTransformer[key as WeatherForecastModes](newState.data[key]);
		}
	});

	return newState.data[newState.mode];
});

export const getCity = createSelector(getWeatherForecastState, (state: State) =>
	state.currentCity
);

export const getMode = createSelector(getWeatherForecastState, (state: State) =>
	state.mode
);
