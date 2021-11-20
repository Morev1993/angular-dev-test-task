import { WeatherForecastModes } from '../constants/weather-forecast.constants';

export interface City {
	name: string;
	lat: string;
	lon: string;
}

export interface WeatherForecastState {
	loading: false;
	currentCity: City;
}

export interface WeatherForecastItem {temp: string | any}

export type WeatherForecastData = {[key in keyof typeof WeatherForecastModes]?: WeatherForecastItem[] };

export interface WeatherForecastTable {
	columns: any[];
	rows: any[];
}
