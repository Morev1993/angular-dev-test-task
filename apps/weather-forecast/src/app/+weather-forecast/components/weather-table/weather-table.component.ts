import { Component, Input } from '@angular/core';
import { City, WeatherForecastItem } from '../../+state/weather-forecast.models';

@Component({
	selector: 'bp-weather-table',
	templateUrl: './weather-table.component.html',
	styleUrls: ['./weather-table.component.scss']
})
export class WeatherTableComponent {
	@Input() weatherData: WeatherForecastItem[] | null;
	@Input() city: City | null;

}
