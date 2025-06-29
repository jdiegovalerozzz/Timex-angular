import { Routes } from '@angular/router';
import {Login} from './auth/login/login'
import {Register} from './auth/register/register'
import { App } from './app'
import { ClockDashboard } from './clock/clock-dashboard';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login, title: 'Sign in' },
    { path: 'register', component: Register, title: 'Sign up' },
    { path: '', component: ClockDashboard, canActivate: [AuthGuard], title: 'Clocks' },
    {  path: '**', redirectTo: '' },
    
];
