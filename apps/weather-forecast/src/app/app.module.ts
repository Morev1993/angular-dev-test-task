import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {AppRoutingModule} from "./app-routing.module";
import { AppComponent } from './core/containers/app.component';
import {CoreModule} from "./core/core.module";
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
	imports: [
		BrowserModule,
		StoreModule.forRoot(
			{},
			{
				metaReducers: !environment.production ? [] : [],
				runtimeChecks: {
					strictActionImmutability: true,
					strictStateImmutability: true,
				},
			}
		),
		EffectsModule.forRoot([]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		StoreModule.forRoot(
			{
				router: routerReducer
			},
			{
				metaReducers: !environment.production ? [] : [],
				runtimeChecks: {
					strictActionImmutability: true,
					strictStateImmutability: true,
				},
			}
		),
		StoreDevtoolsModule.instrument({
			name: 'Weather forecast App',
		}),
		StoreRouterConnectingModule.forRoot(),
		CoreModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
