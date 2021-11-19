import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWeatherForecast from './+state/weather-forecast.reducer';
import { WeatherForecastEffects } from './+state/weather-forecast.effects';
import { WeatherForecastFacade } from './+state/weather-forecast.facade';
import {RouterModule} from "@angular/router";
import { WeatherForecastComponent } from './containers/weather-forecast/weather-forecast.component';

@NgModule({
	declarations: [
    WeatherForecastComponent
  ],
	imports: [
		CommonModule,
		StoreModule.forFeature(fromWeatherForecast.WEATHER_FORECAST_FEATURE_KEY, fromWeatherForecast.reducer),
		EffectsModule.forFeature([WeatherForecastEffects]),
		RouterModule.forChild([
			{path: '', component: WeatherForecastComponent},
		]),
	],
	providers: [WeatherForecastFacade],
})
export class WeatherForecastModule {}
