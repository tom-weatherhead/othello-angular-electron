// othello-angular-electron/src/app/components/bar-chart/bar-chart.component.ts

import {
	ChangeDetectorRef,
	Component,
	OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'bar-chart',
	templateUrl: './bar-chart.component.html' //,
	// styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
	public chartOptions: any;
	public chartLabels: string[];
	public chartType: string;
	public chartLegend: boolean = true;
	public chartData: any[];

	constructor(private changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private location: Location
	) {
	}

	ngOnInit() {
		this.displayChart();
	}

	createDefaultChartSettings(): any {
		return {
			labels: ['One', 'Two', 'Three', 'Four'],
			type: 'bar',
			data: [10, 20, 30, 40]
		};
	}

	displayChart () {
		const chartSettings = this.createDefaultChartSettings();
		const oldChartType = this.chartType;

		this.chartOptions = chartSettings.options;
		this.chartLabels = chartSettings.labels;
		// this.chartLabels = this.clone(chartSettings.labels);
		this.chartType = chartSettings.type;
		// this.chartLegend = chartSettings.legend;

		// if (oldChartType === 'pie' && this.chartType === 'pie') {
		// 	let clone = JSON.parse(JSON.stringify(this.chartData));

		// 	clone = chartSettings.data;

		// 	this.chartData = clone;
		// } else {
		this.chartData = chartSettings.data;
		// }

		this.changeDetectorRef.detectChanges();			// !!! This is necessary.
	}

	goBack(): void {
		this.location.back();
	}

	// Events:

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

	// public randomize(): void {
	// 	// Only Change 3 values
	// 	let data = [
	// 	Math.round(Math.random() * 100),
	// 	59,
	// 	80,
	// 	(Math.random() * 100),
	// 	56,
	// 	(Math.random() * 100),
	// 	40];
	// 	let clone = JSON.parse(JSON.stringify(this.chartData));
	// 	clone[0].data = data;
	// 	this.chartData = clone;
	// 	/**
	// 	* (My guess), for Angular to recognize the change in the dataset
	// 	* it has to change the dataset variable directly,
	// 	* so one way around it, is to clone the data, change it and then
	// 	* assign it;
	// 	*/
	// }

	public onClickGoToOthello(): void {
		this.router.navigate(['/othello']);
	}
}
