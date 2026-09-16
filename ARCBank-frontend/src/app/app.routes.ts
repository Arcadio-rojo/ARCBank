import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from "./features/dashboard/dashboard";
import {Accounts} from "./features/accounts/accounts";
import { Transactions } from "./features/transactions/transactions";
import { Admin } from "./features/admin/admin";

export const routes: Routes = [
    { path : '', redirectTo: 'login', pathMatch: 'full'  },
    { path : 'login', component: Login},
    { path : 'register', component: Register},
    { path : 'dashboard', component: Dashboard},
    { path : 'accounts', component: Accounts },
    { path : 'transactions', component: Transactions},
    { path : 'admin', component: Admin}
];

