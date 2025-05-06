import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const accountRouterConfig: Routes = [
    {
        path: '', 
        component: AccountComponent, 
        children : [
            { path: 'register', component: RegisterComponent},
            { path: 'login', component: LoginComponent}
        ]
    }
];
