import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as WeatherForecastActions from './weather-forecast.actions';
import { WeatherForecastEffects } from './weather-forecast.effects';
import { WeatherForecastFacade } from './weather-forecast.facade';
import { WeatherForecastEntity } from './weather-forecast.models';
import { WEATHER_FORECAST_FEATURE_KEY, State, initialState, reducer } from './weather-forecast.reducer';
import * as WeatherForecastSelectors from './weather-forecast.selectors';

interface TestSchema {
	weatherForecast: State;
}

describe('WeatherForecastFacade', () => {
	let facade: WeatherForecastFacade;
	let store: Store<TestSchema>;
	const createWeatherForecastEntity = (id: string, name = ''): WeatherForecastEntity => ({
		id,
		name: name || `name-${id}`,
	});

	describe('used in NgModule', () => {
		beforeEach(() => {
			@NgModule({
				imports: [
					StoreModule.forFeature(WEATHER_FORECAST_FEATURE_KEY, reducer),
					EffectsModule.forFeature([WeatherForecastEffects]),
				],
				providers: [WeatherForecastFacade],
			})
			class CustomFeatureModule {}

			@NgModule({
				imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
			})
			class RootModule {}
			TestBed.configureTestingModule({ imports: [RootModule] });

			store = TestBed.inject(Store);
			facade = TestBed.inject(WeatherForecastFacade);
		});

		/**
		 * The initially generated facade::loadAll() returns empty array
		 */
		it('loadAll() should return empty list with loaded == true', async () => {
			let list = await readFirst(facade.allWeatherForecast$);
			let isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(false);

			facade.init();

			list = await readFirst(facade.allWeatherForecast$);
			isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(true);
		});

		/**
		 * Use `loadWeatherForecastSuccess` to manually update list
		 */
		it('allWeatherForecast$ should return the loaded list; and loaded flag == true', async () => {
			let list = await readFirst(facade.allWeatherForecast$);
			let isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(false);

			store.dispatch(
				WeatherForecastActions.loadWeatherForecastSuccess({
					weatherForecast: [createWeatherForecastEntity('AAA'), createWeatherForecastEntity('BBB')],
				})
			);

			list = await readFirst(facade.allWeatherForecast$);
			isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(2);
			expect(isLoaded).toBe(true);
		});
	});
});
