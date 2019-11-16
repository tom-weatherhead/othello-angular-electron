// othello-angular-electron/src/app/components/bar-chart/bar-chart.component.ts

import {
	Component,
	ElementRef,
	OnInit,
	ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Chart } from 'chart.js';

const chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

@Component({
	selector: 'bar-chart',
	templateUrl: './bar-chart.component.html' //,
	// styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
	@ViewChild('canvas', { static: true })
	canvas: ElementRef<HTMLCanvasElement>;

	context: CanvasRenderingContext2D;
	chart: Chart;
	public chartOptions: any;
	public chartLabels: string[];
	public chartType: string;
	public chartLegend: boolean = true;
	public chartData: any[];

	constructor(//private changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private location: Location
	) {
	}

	ngOnInit() {
		this.context = this.canvas.nativeElement.getContext('2d');

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

		this.chart = new Chart(this.context, {
			type: chartSettings.type,
			// data: this.chartData,
			// data: {
			// 	labels: ['Group 1', 'Group 2', 'Group 3'],
			// 	datasets: [{
			// 		  label: 'Groups',
			// 		  data: [12, 19, 3]
			// 	}]
			// },
			data: {
				// labels: ['#apples', '#pears', '#apricots', '#acorns', '#amigas' /*, '#orics' */],
				datasets: [
					{
						label: 'Test',
						lineTension: 0.15,
						data: [1, 1, 2, 3, 5],
						// backgroundColor: '#37738353',
						backgroundColor: [
							chartColors.red,
							chartColors.orange,
							chartColors.yellow,
							chartColors.green,
							chartColors.blue
						],
						borderColor: '#37738353',
						borderWidth: 3,
						borderCapStyle: 'round',
						fill: true
					}
				],
				labels: [
					'Red',
					'Orange',
					'Yellow',
					'Green',
					'Blue'
				]
			},
			// labels: chartSettings.labels,
			options: {
				hover: {
					intersect: true,
				},
				onClick(ev: MouseEvent, points: any[]) {
					console.log('onClick() :', points, ev);
				},
				onHover(ev: MouseEvent, points: any[]) {
					console.log('onHover() :', points, ev);
				},
				title: {
					// text: ['foo', 'bar'],
					text: 'Title'
				},
				legend: {
					display: true,
					labels: {
						usePointStyle: true,
						padding: 40,
					}
				}
			}
		});
		// this.showChart = true;
		// this.changeDetectorRef.detectChanges();			// !!! This is necessary.
	}

	goBack(): void {
		this.location.back();
	}

	// Events:

	// public chartClicked(e: any): void {
	// 	console.log(e);

	// 	if (e.active && e.active.length) {
	// 		console.log(e.active[0]);
	// 		// For a multi-university chart, go to the details page for university/(id = e.active[0].index)
	// 	}
	// }

	// public chartHovered(e: any): void {
	// 	console.log(e);
	// }

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
