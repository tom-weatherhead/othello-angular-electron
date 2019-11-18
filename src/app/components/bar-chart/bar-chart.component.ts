// othello-angular-electron/src/app/components/bar-chart/bar-chart.component.ts

import {
	// AfterViewChecked,
	AfterViewInit,
	// ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild
} from '@angular/core';
// import { Component, ChangeDetectorRef, OnInit }     from '@angular/core';
import { /* ActivatedRoute, ParamMap, */ Router } from '@angular/router';
import { Location }                         from '@angular/common';

// import { BorderWidth, Chart, Point, ChartColor } from 'chart.js';
// import { Chart } from 'chart.js';

import { BarChartCanvasComponent } from 'thaw-angular-component-library';
// import { BarChartCanvasComponent } from 'BarChartCanvasModule';
// import { ea as BarChartCanvasComponent } from 'thaw-angular-component-library';
// import { BarChartCanvasModule } from 'thaw-angular-component-library';

@Component({
	selector: 'bar-chart',
	templateUrl: './bar-chart.component.html' //,
	// styleUrls: ['./bar-chart.component.scss']
})
// export class BarChartComponent implements AfterViewChecked, AfterViewInit, OnInit {
export class BarChartComponent implements AfterViewInit, OnInit {
	// @ViewChild('canvas', { static: true })
	// canvas: ElementRef<HTMLCanvasElement>;

	@ViewChild('barChart', { static: false })
	barChart: BarChartCanvasComponent;

	constructor(// private changeDetectorRef: ChangeDetectorRef,
		// private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
	}

	ngOnInit() {
		// this.context = this.canvas.nativeElement.getContext('2d');

		// this.displayChart();

		// TODO: this.barChart.displayChart();
		// this.barChart.displayChart();
		// this.barChart.nativeElement.displayChart();
	}

	ngAfterViewInit() {
		// console.log(this.child.whoAmI());
		//this.barChart.displayChart();
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
