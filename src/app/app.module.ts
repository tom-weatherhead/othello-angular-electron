// othello-angular-electron/src/app/app.module.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';

// FormsModule must be present in order for ngModel to work.
// See https://stackoverflow.com/questions/43298011/angular-4-cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input
import {
	FormsModule // ,
	// ReactiveFormsModule
} from '@angular/forms';

import {
	// NgbModule //,
	NgbButtonsModule,
	NgbDropdownModule // ,
	// NgbDropdown
} from '@ng-bootstrap/ng-bootstrap';

// import { BarChartCanvasModule, PieChartCanvasModule } from 'thaw-angular-component-library';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { OthelloComponent } from './components/othello/othello.component';
// import { PieChartComponent } from './components/pie-chart/pie-chart.component';
// import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
	imports: [
		AppRoutingModule,
		BrowserModule,
		CommonModule,
		FormsModule,
		// HttpClientModule,

		// ReactiveFormsModule,
		// JsonpModule,
		// NgbModule.forRoot()

		NgbButtonsModule,
		NgbDropdownModule // ,
		// NgbDropdownModule

		// BarChartCanvasModule,
		// PieChartCanvasModule
	],
	declarations: [
		AppComponent,
		// NgbDropdown,
		// PieChartComponent,
		OthelloComponent //,
		// PieChartComponent,
		// BarChartComponent
	],
	providers: [
		// ConfigService,
		// HttpJsonClientService,
		// etc.
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
