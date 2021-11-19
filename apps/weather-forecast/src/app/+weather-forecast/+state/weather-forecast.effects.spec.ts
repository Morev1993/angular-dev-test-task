import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as WeatherForecastActions from './weather-forecast.actions';
import { WeatherForecastEffects } from './weather-forecast.effects';

describe('WeatherForecastEffects', () => {
	let actions: Observable<Action>;
	let effects: WeatherForecastEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NxModule.forRoot()],
			providers: [WeatherForecastEffects, provideMockActions(() => actions), provideMockStore()],
		});

		effects = TestBed.inject(WeatherForecastEffects);
	});

	describe('init$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: WeatherForecastActions.init() });

			const expected = hot('-a-|', {
				a: WeatherForecastActions.loadWeatherForecastSuccess({ weatherForecast: [] }),
			});

			expect(effects.init$).toBeObservable(expected);
		});
	});
});
