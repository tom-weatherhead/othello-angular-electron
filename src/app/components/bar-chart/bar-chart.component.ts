// othello-angular-electron/src/app/components/bar-chart/bar-chart.component.ts

import {
	// AfterViewChecked,
	AfterViewInit,
	// ChangeDetectorRef,
	Component,
	// ElementRef,
	// OnInit,
	ViewChild
} from '@angular/core';
import { /* ActivatedRoute, ParamMap, */ Router } from '@angular/router';
import { Location }                         from '@angular/common';

// import { BorderWidth, Chart, Point, ChartColor } from 'chart.js';

import { BarChartCanvasComponent } from 'thaw-angular-component-library';

@Component({
	selector: 'bar-chart',
	templateUrl: './bar-chart.component.html' //,
	// styleUrls: ['./bar-chart.component.scss']
})
// export class BarChartComponent implements AfterViewChecked, AfterViewInit, OnInit {
export class BarChartComponent implements AfterViewInit {
	@ViewChild('barChart', { static: false })
	barChart: BarChartCanvasComponent;

	constructor(// private changeDetectorRef: ChangeDetectorRef,
		// private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
	}

	// ngOnInit() {
	// }

	ngAfterViewInit() {
		console.log('this.barChart is', typeof this.barChart, this.barChart);
		this.barChart.sayHi();
	}

	goBack(): void {
		this.location.back();
	}

	public onClickGoToOthello(): void {
		this.router.navigate(['/othello']);
	}
}
