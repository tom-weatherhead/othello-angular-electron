// othello-angular-electron/src/app/app.module.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// FormsModule must be present in order for ngModel to work.
// See https://stackoverflow.com/questions/43298011/angular-4-cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import {
// 	// NgbModule //,
// 	NgbButtonsModule,
// 	NgbDropdownModule // ,
// 	// NgbDropdown
// } from '@ng-bootstrap/ng-bootstrap';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';

// import { AppComponent } from './components/app/app.component';
import { OthelloComponent } from './components/othello/othello.component';

@NgModule({
	imports: [
		AppRoutingModule,
		BrowserModule,
		CommonModule,
		FormsModule,
		// HttpClientModule,

		BrowserModule, // Required by Angular Material
		BrowserAnimationsModule, // Required by Angular Material
		FormsModule, // Required by ngModel and Angular Material
		ReactiveFormsModule, // Required by Angular Material

		MatButtonModule, // Part of Angular Material
		MatCheckboxModule, // Part of Angular Material
		// MatDatepickerModule,
		MatInputModule,
		// MatNativeDateModule,
		MatSelectModule,
		MatSidenavModule,
		MatToolbarModule,
		MatTooltipModule // Part of Angular Material
	],
	declarations: [
		// AppComponent,
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
	bootstrap: [OthelloComponent]
})
export class AppModule {}
