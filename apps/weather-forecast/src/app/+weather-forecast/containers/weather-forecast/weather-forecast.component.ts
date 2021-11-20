import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {WeatherForecastFacade} from "../../+state/weather-forecast.facade";
import {debounceTime, distinctUntilChanged, fromEvent, map, Observable} from "rxjs";
import { City, WeatherForecastItem } from '../../+state/weather-forecast.models';
import {WeatherForecastModes} from "../../constants/weather-forecast.constants";
import { Router } from '@angular/router';

@Component({
	selector: 'bp-weather-forecast',
	templateUrl: './weather-forecast.component.html',
	styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements AfterViewInit {
	@ViewChild('input') searchInput: ElementRef<HTMLInputElement>;

	city$: Observable<City>;
	mode$: Observable<WeatherForecastModes>;
	weather$: Observable<WeatherForecastItem[] | undefined>;
	searchQueryParam$: Observable<string>;

	modes = [WeatherForecastModes.hourly, WeatherForecastModes.daily];

	constructor(public weatherForecastFacade: WeatherForecastFacade, private router: Router) {
		this.city$ = this.weatherForecastFacade.city$;

		this.weather$ = this.weatherForecastFacade.weatherForecast$;
		this.searchQueryParam$ = this.weatherForecastFacade.searchQueryParam$;
		this.mode$ = this.weatherForecastFacade.mode$;

	}

	ngAfterViewInit() {
		this.weatherForecastFacade.loadLocations('');

		fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			map((event) => (event.target as HTMLInputElement).value),
			debounceTime(700),
			distinctUntilChanged(),
		).subscribe((value) => {
			this.weatherForecastFacade.loadLocations(value);
			this.navigate({
				city: value
			});
		});

	}

	changeMode(mode: WeatherForecastModes) {
		this.weatherForecastFacade.changeMode(mode);
		this.navigate({
			mode
		});
	}

	navigate(queryParams: {
		[key: string]: string;
	}) {
		this.router.navigate(['weather-forecast'], {
			queryParams,
			queryParamsHandling: 'merge'
		})
	}
}
