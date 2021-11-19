import { WeatherForecastEntity } from './weather-forecast.models';
import { weatherForecastAdapter, WeatherForecastPartialState, initialState } from './weather-forecast.reducer';
import * as WeatherForecastSelectors from './weather-forecast.selectors';

describe('WeatherForecast Selectors', () => {
	const ERROR_MSG = 'No Error Available';
	const getWeatherForecastId = (it: WeatherForecastEntity) => it.id;
	const createWeatherForecastEntity = (id: string, name = '') =>
		({
			id,
			name: name || `name-${id}`,
		} as WeatherForecastEntity);

	let state: WeatherForecastPartialState;

	beforeEach(() => {
		state = {
			weatherForecast: weatherForecastAdapter.setAll(
				[
					createWeatherForecastEntity('PRODUCT-AAA'),
					createWeatherForecastEntity('PRODUCT-BBB'),
					createWeatherForecastEntity('PRODUCT-CCC'),
				],
				{
					...initialState,
					selectedId: 'PRODUCT-BBB',
					error: ERROR_MSG,
					loaded: true,
				}
			),
		};
	});

	describe('WeatherForecast Selectors', () => {
		it('getAllWeatherForecast() should return the list of WeatherForecast', () => {
			const results = WeatherForecastSelectors.getAllWeatherForecast(state);
			const selId = getWeatherForecastId(results[1]);

			expect(results.length).toBe(3);
			expect(selId).toBe('PRODUCT-BBB');
		});

		it('getSelected() should return the selected Entity', () => {
			const result = WeatherForecastSelectors.getSelected(state) as WeatherForecastEntity;
			const selId = getWeatherForecastId(result);

			expect(selId).toBe('PRODUCT-BBB');
		});

		it('getWeatherForecastLoaded() should return the current "loaded" status', () => {
			const result = WeatherForecastSelectors.getWeatherForecastLoaded(state);

			expect(result).toBe(true);
		});

		it('getWeatherForecastError() should return the current "error" state', () => {
			const result = WeatherForecastSelectors.getWeatherForecastError(state);

			expect(result).toBe(ERROR_MSG);
		});
	});
});
