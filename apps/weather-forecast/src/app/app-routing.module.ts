import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/weather-forecast',
		pathMatch: 'full'
	},
	{
		path: 'weather-forecast',
		loadChildren: () => import('./+weather-forecast/weather-forecast.module').then(m => m.WeatherForecastModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot([
			{
				path: '',
				redirectTo: '/weather-forecast',
				pathMatch: 'full'
			},
			{
				path: 'weather-forecast',
				loadChildren: () => import('./+weather-forecast/weather-forecast.module').then(m => m.WeatherForecastModule)
			}
		])
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
