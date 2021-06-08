// othello-angular-electron/src/app/components/app/app.component.ts

import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	toggleStatus = false;

	menuToggle(): void {
		this.toggleStatus = !this.toggleStatus;
	}
}
