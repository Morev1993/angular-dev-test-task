import { WeatherForecastData, WeatherForecastItem } from '../+state/weather-forecast.models';

export class WeatherTransformer {
	data: WeatherForecastData;

	constructor(data: WeatherForecastData) {
		this.data = data;
	}

	transform() {

	}
	hourly = (items: WeatherForecastItem[]) => {
		return items.map(item => {
			return {
				...item,
				temp: item.temp.day
			}
		}).filter((item, i) => i % 3)
	}
}
