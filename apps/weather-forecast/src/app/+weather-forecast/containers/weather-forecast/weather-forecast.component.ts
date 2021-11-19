import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {WeatherForecastFacade} from "../../+state/weather-forecast.facade";
import {debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable} from "rxjs";
import {City, WeatherForecastData} from "../../+state/weather-forecast.models";

@Component({
	selector: 'bp-weather-forecast',
	templateUrl: './weather-forecast.component.html',
	styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements AfterViewInit {
	@ViewChild('input') searchInput: ElementRef<HTMLInputElement>;

	city$: Observable<City>;
	weatherForecast$: Observable<WeatherForecastData>;

	constructor(public weatherForecastFacade: WeatherForecastFacade) {
		this.city$ = this.weatherForecastFacade.city$;
		this.weatherForecast$ = this.weatherForecastFacade.weatherForecast$;
	}

	ngAfterViewInit() {
		fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			debounceTime(700),
			filter((event: any) => {
				return event.target && !!event.target.value;
			}),
			map((event: any) => event.target.value),
			distinctUntilChanged(),
		).subscribe((value) => {
			this.weatherForecastFacade.loadLocations(value)
		});

	}
}
