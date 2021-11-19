import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as WeatherForecastActions from './weather-forecast.actions';
import * as WeatherForecastSelectors from './weather-forecast.selectors';

@Injectable()
export class WeatherForecastFacade {
	/**
	 * Combine pieces of state using createSelector,
	 * and expose them as observables through the facade.
	 */
	loaded$ = this.store.pipe(select(WeatherForecastSelectors.getWeatherForecastLoaded));
	allWeatherForecast$ = this.store.pipe(select(WeatherForecastSelectors.getAllWeatherForecast));
	selectedWeatherForecast$ = this.store.pipe(select(WeatherForecastSelectors.getSelected));

	constructor(private readonly store: Store) {}

	/**
	 * Use the initialization action to perform one
	 * or more tasks in your Effects.
	 */
	init() {
		this.store.dispatch(WeatherForecastActions.init());
	}
}
