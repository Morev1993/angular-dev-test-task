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
	loading$ = this.store.pipe(select(WeatherForecastSelectors.getWeatherForecastLoading));
	weatherForecast$ = this.store.pipe(select(WeatherForecastSelectors.getAllWeatherForecast));

	city$ = this.store.pipe(select(WeatherForecastSelectors.getCity));


	constructor(private readonly store: Store) {}

	loadWeather() {
		this.store.dispatch(WeatherForecastActions.loadWeatherForecast());
	}

	loadLocations(query: string) {
		this.store.dispatch(WeatherForecastActions.loadLocations({
			query
		}));
	}
}
