// othello-angular-electron/src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AppComponent } from './components/app/app.component';
import { OthelloComponent } from './components/othello/othello.component';

const routes: Routes = [
	{ path: '', redirectTo: '/app-root', pathMatch: 'full' },
	{ path: 'app-root', component: OthelloComponent } // ,
	// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	// { path: 'dashboard',			component: DashboardComponent },
	// { path: 'detail/:id',			component: HeroDetailComponent },
	// { path: 'othello', component: OthelloComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
