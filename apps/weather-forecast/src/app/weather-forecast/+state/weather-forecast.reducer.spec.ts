import { Action } from '@ngrx/store';

import * as WeatherForecastActions from './weather-forecast.actions';
import { WeatherForecastEntity } from './weather-forecast.models';
import { State, initialState, reducer } from './weather-forecast.reducer';

describe('WeatherForecast Reducer', () => {
	const createWeatherForecastEntity = (id: string, name = ''): WeatherForecastEntity => ({
		id,
		name: name || `name-${id}`,
	});

	describe('valid WeatherForecast actions', () => {
		it('loadWeatherForecastSuccess should return the list of known WeatherForecast', () => {
			const weatherForecast = [
				createWeatherForecastEntity('PRODUCT-AAA'),
				createWeatherForecastEntity('PRODUCT-zzz'),
			];
			const action = WeatherForecastActions.loadWeatherForecastSuccess({ weatherForecast });

			const result: State = reducer(initialState, action);

			expect(result.loaded).toBe(true);
			expect(result.ids.length).toBe(2);
		});
	});

	describe('unknown action', () => {
		it('should return the previous state', () => {
			const action = {} as Action;

			const result = reducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});
});
