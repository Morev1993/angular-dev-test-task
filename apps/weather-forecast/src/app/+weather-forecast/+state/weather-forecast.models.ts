import {WeatherForecastMode} from "../constants/weather-forecast.constants";

export interface City {
	name: string;
	lat: string;
	lon: string;
}

export interface WeatherForecastState {
	mode: WeatherForecastMode;
	loading: false;
	currentCity: City;
}

export interface WeatherForecastItem {temp: string}

export interface WeatherForecastData {
	lat: string;
	lon: string;
	hourly?: WeatherForecastItem[];
	daily?: WeatherForecastItem[];
}

export interface WeatherForecastTable {
	columns: any[];
	rows: any[];
}
