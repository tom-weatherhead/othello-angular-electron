// othello-angular-electron/src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';

// FormsModule must be present in order for ngModel to work.
// See https://stackoverflow.com/questions/43298011/angular-4-cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input
import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';

/*
import {
	RouterModule
	// , Routes
} from '@angular/router';
 */

import {
	NgbModule //,
	// NgbDropdownModule,
	// NgbDropdown
} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './components/app/app.component';
import { OthelloComponent } from './components/othello/othello.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		// HttpClientModule,

		// RouterModule.forRoot(appRoutes),
		// RouterModule,

		ReactiveFormsModule,
		// JsonpModule,
		// NgbModule.forRoot()

		ChartsModule,

		NgbModule
		// NgbDropdownModule
	],
	declarations: [
		AppComponent,
		// NgbDropdown,
		OthelloComponent,
		PieChartComponent,
		BarChartComponent
	],
	providers: [
		// ConfigService,
		// HttpJsonClientService,
		// etc.
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
