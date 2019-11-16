// othello-angular-electron/src/app/components/pie-chart/pie-chart.component.ts

import {
	// AfterViewChecked,
	// AfterViewInit,
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
	selector: 'pie-chart',
	templateUrl: './pie-chart.component.html' //,
	// styleUrls: ['./pie-chart.component.scss']
})
// export class PieChartComponent implements AfterViewChecked, AfterViewInit, OnInit {
export class PieChartComponent implements OnInit {
	@ViewChild('canvas', { static: true })
	canvas: ElementRef<HTMLCanvasElement>;

	context: CanvasRenderingContext2D;
	chart: Chart;
	public chartOptions: any;
	public chartLabels: string[];
	public chartType: string;
	public chartLegend: boolean = true;
	public chartData: any[];
	// toggleStatus: boolean = false;

	constructor(// private changeDetectorRef: ChangeDetectorRef,
		// private route: ActivatedRoute,
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
			labels: ['One', 'Two', 'Three', 'Four'], // universities.map(university => university.shortName),
			type: 'pie',
			data: [10, 20, 30, 40] // universities.map(university => university.funk)
		};
	}

	displayChart(): void {
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
						// label: 'test',
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

	// public goToChart(chartID: number): void {
	// 	this.router.navigate(['/charts', chartID]);
	// }

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

	public onClickGoToBarChart(): void  {
		this.router.navigate(['/bar-chart']);
	}
}

/* From https://riptutorial.com/chart-js :
<html>
    <body>
        <canvas id="myChart" width="400" height="400"></canvas>
        <script>
              var ctx = document.getElementById("myChart");
              var myChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                      labels: ["Group 1", "Group 2", "Group 3"],
                      datasets: [{
                          label: 'Groups',
                          data: [12, 19, 3]
                      }]
                  }
              });
        </script>
    </body>
</html>
 */

/* From https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chart.js/chart.js-tests.ts :
import { BorderWidth, Chart, Point, ChartColor } from 'chart.js';

// alternative:
// import chartjs = require('chart.js');
// => chartjs.Chart

const plugin = {
    afterDraw: (chartInstance: Chart, easing: Chart.Easing, options?: any) => { },
};

const ctx = new CanvasRenderingContext2D();

const chart: Chart = new Chart(ctx, {
    type: 'bar',
    plugins: [plugin, plugin],
    data: {
        labels: ['group 1', 'group 2'],
        datasets: [
            {
                backgroundColor: '#000000',
                hoverBackgroundColor: ctx.createLinearGradient(0, 0, 0, 100),
                hoverBorderColor: ctx.createLinearGradient(0, 0, 0, 100),
                borderWidth: 1,
                label: 'test',
                data: [1, null, 3],
            },
            {
                backgroundColor: '#ff0000',
                borderWidth: { top: 1, right: 1, bottom: 0, left: 1 },
                label: 'test',
                data: [1, 3, 5],
                barThickness: 'flex',
                minBarLength: 2,
            }
        ],
    },
    options: {
        hover: {
            intersect: true,
        },
        onHover(ev: MouseEvent, points: any[]) {
            return;
        },
        title: {
            text: ['foo', 'bar'],
        },
        tooltips: {
            filter: data => Number(data.yLabel) > 0,
            intersect: true,
            mode: 'index',
            itemSort: (a, b, data) => Math.random() - 0.5,
            position: 'average',
            caretPadding: 2,
            displayColors: true,
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            titleAlign: 'center',
            callbacks: {
                title: ([point]) => (point.label ? point.label.substring(0, 2) : 'title'),
                label(tooltipItem) {
                    const { value, x, y, label } = tooltipItem;
                    return `${label}(${x}, ${y}) = ${value}`;
                },
            },
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        callback: Math.floor,
                    },
                    gridLines: {
                        display: false,
                        borderDash: [5, 15],
                        borderDashOffset: 2,
                        zeroLineBorderDash: [5, 15],
                        zeroLineBorderDashOffset: 2,
                        lineWidth: [1, 2, 3],
                    },
                },
            ],
        },
        legend: {
            display: true,
            labels: {
                usePointStyle: true,
                padding: 40,
            },
        },
        devicePixelRatio: 2,
        plugins: {
            bar: false,
            foo: {},
        },
    },
});
chart.update({ duration: 500, lazy: false, easing: 'linear' });

console.log(chart.getDatasetMeta(0));

console.log(chart.ctx && chart.ctx.font);
console.log(chart.canvas && chart.canvas.tagName);
if (chart.chartArea) {
    console.log(chart.chartArea.top);
    console.log(chart.chartArea.right);
    console.log(chart.chartArea.bottom);
    console.log(chart.chartArea.left);
}

// Testing custom legends
chart.config.options = {
    ...chart.config.options,
    legend: {
        display: false,
    },
    legendCallback: () => 'legend replacement',
};
chart.update();
const customLegend = chart.generateLegend();
console.log(customLegend === 'legend replacement');

// Testing radial chart
const tickOptions: Chart.LinearTickOptions = {
    max: 100,
    stepSize: 33,
    display: false,
    beginAtZero: true,
};
const scaleOptions: Chart.RadialLinearScale = {
    animate: false,
    position: 'chartArea',
    angleLines: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
        lineWidth: 1,
        borderDash: [],
        borderDashOffset: 0.0
    },
    pointLabels: {
        callback: () => 'pointLabels callback',
        fontColor: '#666',
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        fontSize: 10,
        fontStyle: 'normal',
        lineHeight: 1.2
    },
    ticks: tickOptions,
    display: false,
    gridLines: {
        display: true,
        circular: false,
        color: 'rgba(0, 0, 0, 0.1)',
        borderDash: [],
        borderDashOffset: 0.0,
        lineWidth: 1,
        drawBorder: true,
        drawOnChartArea: true,
        drawTicks: true,
        tickMarkLength: 10,
        zeroLineWidth: 1,
        zeroLineColor: 'rgba(0, 0, 0, 0.25)',
        zeroLineBorderDash: [],
        zeroLineBorderDashOffset: 0.0,
        offsetGridLines: false
    }
};
const radarChartOptions: Chart.RadialChartOptions = {
    legend: { display: false },
    scale: scaleOptions,
    responsive: true,
};
const chartConfig: Chart.ChartConfiguration = {
    type: 'radar',
    data: {
        labels: ['#apples', '#pears', '#apricots', '#acorns', '#amigas', '#orics'],
        datasets: [
            {
                label: 'test',
                lineTension: 0.15,
                data: [1, 1, 2, 3, 5],
                backgroundColor: '#37738353',
                borderColor: '#37738353',
                borderWidth: 3,
                borderCapStyle: 'round',
                fill: true,
            },
        ],
    },
    options: radarChartOptions,
};
const radialChart: Chart = new Chart(new CanvasRenderingContext2D(), chartConfig);
radialChart.update();

console.log(radialChart.ctx && radialChart.ctx.font);
console.log(radialChart.canvas && radialChart.canvas.tagName);
if (radialChart.chartArea) {
    console.log(radialChart.chartArea.top);
    console.log(radialChart.chartArea.right);
    console.log(radialChart.chartArea.bottom);
    console.log(radialChart.chartArea.left);
}

// http://www.chartjs.org/docs/latest/configuration/tooltip.html#position-modes
Chart.Tooltip.positioners.custom = (elements: any[], eventPosition: Point) => {
    return {
        x: eventPosition.x,
        y: eventPosition.y + 10,
    };
};

if (radialChart.width !== null && radialChart.height !== null) {
    console.log('area', radialChart.width * radialChart.height);
}
if (radialChart.aspectRatio !== null) {
    console.log(radialChart.aspectRatio * 2);
}
console.log(radialChart.options === radialChart.config.options);

const chartWithScriptedOptions = new Chart(new CanvasRenderingContext2D(), {
    type: "bar",
    data: {
        labels: ["a", "b", "c", "d", "e"],
        datasets: [{
            label: "test",
            data: [1, 3, 5, 4, 2],
            backgroundColor: ({ dataset, dataIndex }): ChartColor => {
                if (dataset === undefined || dataset.data === undefined || dataIndex === undefined) {
                    return "black";
                }
                const value = dataset.data[dataIndex];
                if (typeof value !== "number") {
                    return "black";
                }
                return value > 3 ? "red" : "green";
            },
            borderWidth: ({ dataset, dataIndex }): BorderWidth => {
                if (dataset === undefined || dataset.data === undefined || dataIndex === undefined) {
                    return 1;
                }
                return { top: 1, right: 1, bottom: 0, left: 1 };
            }
        }],
    }
});

// linear scale
const linearScaleChart: Chart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            backgroundColor: '#000',
            borderColor: '#f00',
            data: [],
            type: 'line',
        }]
    },
    options: {
        scales: {
            displayFormats: {
                month: 'MMM YYYY',
            },
            xAxes: [{
                type: 'time',
                distribution: 'series',
                ticks: {
                    source: 'data',
                    autoSkip: true
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Closing price ($)'
                }
            }]
        },
        tooltips: {
            intersect: false,
            mode: 'index',
        }
    }
});

// custom tooltips
const customTooltipsPieChart = new Chart(ctx, {
    type: 'pie',
    data: {},
    options: {
        tooltips: {
            enabled: false,
            custom: (tooltipModel) => {
                // do whatever
            },
        },
    },
});
 */
