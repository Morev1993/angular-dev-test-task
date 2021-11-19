import {Component} from '@angular/core';
import {WeatherForecastFacade} from "../../+state/weather-forecast.facade";
import {debounceTime, distinctUntilChanged, Observable, of, tap} from "rxjs";
import {City} from "../../+state/weather-forecast.models";

@Component({
	selector: 'bp-weather-forecast',
	templateUrl: './weather-forecast.component.html',
	styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent {
	city$: Observable<City>;

	constructor(public weatherForecastFacade: WeatherForecastFacade) {
		this.city$ = this.weatherForecastFacade.city$;

		this.city$.subscribe(value => {
			console.log('city$', value);
		})
	}

	loadCity(event: any) {
		of(event.target.value).pipe(
			debounceTime(700),
			distinctUntilChanged(),
			tap((value) => {
				console.log(value);
				this.weatherForecastFacade.loadLocations(value)
			})
		).subscribe();
	}
}
