import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as WeatherForecastActions from './weather-forecast.actions';
import * as WeatherForecastSelectors from './weather-forecast.selectors';
import { WeatherForecastModes } from '../constants/weather-forecast.constants';
import { map} from 'rxjs/operators';
import { selectQueryParams } from '../../router.selectors';

@Injectable()
export class WeatherForecastFacade {
	weatherForecast$ = this.store.pipe(select(WeatherForecastSelectors.getAllWeatherItems));

	city$ = this.store.pipe(select(WeatherForecastSelectors.getCity));
	mode$ = this.store.pipe(select(WeatherForecastSelectors.getMode));
	searchQueryParam$ = this.store.pipe(select(selectQueryParams), map(value => value.city));

	constructor(private readonly store: Store) {}

	loadLocations(query: string) {
		this.store.dispatch(WeatherForecastActions.loadLocations({
			query
		}));
	}

	changeMode(mode: WeatherForecastModes) {
		this.store.dispatch(WeatherForecastActions.changeMode({
			mode
		}));
	}
}
