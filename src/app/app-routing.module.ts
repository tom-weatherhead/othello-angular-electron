import { NgModule }             		    from '@angular/core';
import { RouterModule, Routes } 		    from '@angular/router';

import { AppComponent } from './components/app/app.component';
// import { DashboardComponent }   		    from '../components/dashboard/dashboard.component';
import { OthelloComponent } from './components/othello/othello.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
// import { ObservableDemoComponent }        from '../components/observable-demo/observable-demo.component';
// import { ConfigComponent }              from '../components/config/config.component';

const routes: Routes = [
	// { path: '', redirectTo: '/app-root', pathMatch: 'full' },
	{ path: '', redirectTo: '/othello', pathMatch: 'full' },
	{ path: 'app-root', component: AppComponent },
	// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	// { path: 'dashboard',			component: DashboardComponent },
	// { path: 'detail/:id',			component: HeroDetailComponent },
	// { path: 'heroes',				component: HeroesComponent },
	// { path: 'universities',		component: UniversitiesComponent },
	// { path: 'university/:id',		component: UniversityDetailComponent },
	// { path: 'charts/:id',			component: UniversityChartComponent },
	// { path: 'sidebar-test',		component: SidebarTestComponent }
	// , { path: 'observable-demo',		component: ObservableDemoComponent }
	// , { path: 'config',		component: ConfigComponent }
	{ path: 'othello',		component: OthelloComponent },
	{ path: 'pie-chart',		component: PieChartComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
