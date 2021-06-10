// spec.ts

import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTooltipModule } from '@angular/material/tooltip';

// RouterTestingModule : See https://stackoverflow.com/questions/41252496/router-outlet-is-not-a-known-element
import { RouterTestingModule } from '@angular/router/testing';

// import {
// 	NgbModule //,
// 	// NgbDropdownModule,
// 	// NgbDropdown
// } from '@ng-bootstrap/ng-bootstrap';

import { OthelloComponent } from './othello.component';

describe('OthelloComponent', () => {
	beforeEach(async(() => {
		/*
		TestBed.configureTestingModule({
		  imports: [ RouterTestingModule ],
		  declarations: [
		    OthelloComponent
		  ],
		}).compileComponents();
		 */
		TestBed.configureTestingModule({
			imports: [
				// BrowserModule,
				// HttpClientModule,
				// FormsModule, // For e.g. NgModel
				// ReactiveFormsModule,
				RouterTestingModule,
				// JsonpModule,
				// NgbModule.forRoot()
				// NgbModule
				// NgbDropdownModule

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
				// MatInputModule,
				// MatNativeDateModule,
				MatSelectModule // ,
				// MatSidenavModule,
				// MatToolbarModule,
				// MatTooltipModule // Part of Angular Material
			],
			declarations: [OthelloComponent]
		}).compileComponents();
	}));

	// it('should be Foo', async(() => {
	// 	expect('Foo').toBe('Foo');
	// }));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(OthelloComponent);
		const app = fixture.debugElement.componentInstance;

		expect(app).toBeTruthy();
	}));

	// it(`should have as title 'app'`, async(() => {
	// 	const fixture = TestBed.createComponent(OthelloComponent);
	// 	const app = fixture.debugElement.componentInstance;

	// 	expect(app.title).toEqual('app');
	// }));

	/*
	it('should render title in a h1 tag', async(() => {
		const fixture = TestBed.createComponent(OthelloComponent);

		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;

		// expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
		expect(compiled.querySelector('h1').textContent).toEqual('Othello');
	}));
	 */
});
