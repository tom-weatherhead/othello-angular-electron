// othello-angular-electron/src/app/components/pie-chart/pie-chart.component.ts

/*
import {
	// AfterViewChecked,
	// AfterViewInit,
	// ChangeDetectorRef,
	Component //,
	// ElementRef,
	// OnInit,
	// ViewChild
} from '@angular/core';
 */
import { Component, ChangeDetectorRef, OnInit }     from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                         from '@angular/common';

@Component({
	// selector: 'pie-chart',
	selector: 'app-root',
	templateUrl: './pie-chart.component.html',
	styleUrls: ['./pie-chart.component.scss']
})
// export class PieChartComponent implements AfterViewChecked, AfterViewInit, OnInit {
export class PieChartComponent implements OnInit {
	public chartOptions: any;
	public chartLabels: string[];
	public chartType: string;
	public chartLegend: boolean = true;
	public chartData: any[];
	toggleStatus: boolean = false;

	constructor(private changeDetectorRef: ChangeDetectorRef,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
		// Placing this call to loadDataAndDisplayIt() in one of the Angular lifecycle functions
		// (ngOnInit, etc.) instead of in the constructor does not seem to work.
		// this.displayChart();
	}

	ngOnInit() {
		// 	this.context = this.canvas.nativeElement.getContext('2d');
		// 	this.onNewGame();
		this.displayChart();
	}

	// createDefaultChartSettings(universities: University[]): any {
	createDefaultChartSettings(): any {
		return {
			labels: ['One', 'Two', 'Three', 'Four'], // universities.map(university => university.shortName),
			type: 'pie',
			data: [10, 20, 30, 40] // universities.map(university => university.funk)
		};
	}

	// createRacePieChartSettings(university: University): any {
	// 	return {
	// 		labels: this.raceLabels,
	// 		type: 'pie',
	// 		data: [
	// 			university.percentWhite,
	// 			university.percentBlack,
	// 			university.percentHispanic,
	// 			university.percentAsian,
	// 			university.percentAmericanNative,
	// 			university.percentPacificIslander,
	// 			university.percentMultipleRaces,
	// 			university.percentNonResidentAlien,
	// 			this.calculatePercentUnknownRace(university)
	// 		]
	// 	};
	// }

	displayChart () {
		const chartSettings = this.createDefaultChartSettings();
		const oldChartType = this.chartType;

		this.chartOptions = chartSettings.options;
		this.chartLabels = chartSettings.labels;
		// this.chartLabels = this.clone(chartSettings.labels);
		this.chartType = chartSettings.type;
		// this.chartLegend = chartSettings.legend;

		if (oldChartType === 'pie' && this.chartType === 'pie') {
			let clone = JSON.parse(JSON.stringify(this.chartData));

			clone = chartSettings.data;

			this.chartData = clone;
		} else {
			this.chartData = chartSettings.data;
		}

		// this.showChart = true;
		this.changeDetectorRef.detectChanges();			// !!! This is necessary.
	}

	goBack(): void {
		this.location.back();
	}

	// Events:

	public goToChart(chartID: number): void {
		this.router.navigate(['/charts', chartID]);
	}

	public chartClicked(e: any): void {
		console.log(e);

		if (e.active && e.active.length) {
			console.log(e.active[0]);
			// For a multi-university chart, go to the details page for university/(id = e.active[0].index)
		}
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	public randomize(): void {
		// Only Change 3 values
		let data = [
		Math.round(Math.random() * 100),
		59,
		80,
		(Math.random() * 100),
		56,
		(Math.random() * 100),
		40];
		let clone = JSON.parse(JSON.stringify(this.chartData));
		clone[0].data = data;
		this.chartData = clone;
		/**
		* (My guess), for Angular to recognize the change in the dataset
		* it has to change the dataset variable directly,
		* so one way around it, is to clone the data, change it and then
		* assign it;
		*/
	}
}
