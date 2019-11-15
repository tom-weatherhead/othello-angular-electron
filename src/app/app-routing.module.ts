// othello-angular-electron/src/app/app-routing.module.ts

import { NgModule }							from '@angular/core';
import { RouterModule, Routes }				from '@angular/router';

import { AppComponent }						from './components/app/app.component';
import { OthelloComponent }					from './components/othello/othello.component';
import { PieChartComponent }				from './components/pie-chart/pie-chart.component';
import { BarChartComponent }				from './components/bar-chart/bar-chart.component';

const routes: Routes = [
	{ path: '', redirectTo: '/othello', pathMatch: 'full' },
	{ path: 'app-root',			component: AppComponent },
	// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	// { path: 'dashboard',			component: DashboardComponent },
	// { path: 'detail/:id',			component: HeroDetailComponent },
	{ path: 'othello',			component: OthelloComponent },
	{ path: 'pie-chart',		component: PieChartComponent },
	{ path: 'bar-chart',		component: BarChartComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
