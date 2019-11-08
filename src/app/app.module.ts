import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';

// FormsModule must be present in order for ngModel to work.
// See https://stackoverflow.com/questions/43298011/angular-4-cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input
import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';

import {
	NgbModule //,
	// NgbDropdownModule,
	// NgbDropdown
} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './components/app/app.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		// HttpClientModule,

		ReactiveFormsModule,
		// JsonpModule,
		// NgbModule.forRoot()

		NgbModule
		// NgbDropdownModule
	],
	declarations: [
		AppComponent //,
		// NgbDropdown
	],
	providers: [
		// ConfigService,
		// HttpJsonClientService,
		// etc.
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
