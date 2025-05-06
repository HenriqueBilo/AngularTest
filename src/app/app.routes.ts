import { Routes } from '@angular/router';
import { HomeComponent } from './navigation/home/home.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'account', 
    loadChildren: () => import('./account/account.route')
    .then(c => c.accountRouterConfig)}, //Lazy loading

    { path: '**', component: NotFoundComponent}
];
