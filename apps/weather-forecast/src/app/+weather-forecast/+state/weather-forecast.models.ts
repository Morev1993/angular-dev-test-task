import {WeatherForecastMode} from "../constants/weather-forecast.constants";

export interface City {
	name: string;
	lat: string;
	lon: string;
}

export interface WeatherForecast {
	mode: WeatherForecastMode;
	items: WeatherForecastItem[];
	loading: false;
	currentCity: City;
}

export interface WeatherForecastItem {
	lat: string;
	lon: string;
	hourly: unknown[];
	daily: unknown[];
}
