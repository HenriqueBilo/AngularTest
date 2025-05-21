import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountGuard } from './services/account.guard';

export const accountRouterConfig: Routes = [
    {
        path: '', 
        component: AccountComponent, 
        children : [
            { path: 'register', component: RegisterComponent, canActivate: [AccountGuard], canDeactivate: [AccountGuard]},
            { path: 'login', component: LoginComponent, canActivate: [AccountGuard]}
        ]
    }
];
