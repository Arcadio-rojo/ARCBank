import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from "./features/dashboard/dashboard";
import {Accounts} from "./features/accounts/accounts";
import { Transactions } from "./features/transactions/transactions";
import { Admin } from "./features/admin/admin";
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'dashboard', component: Dashboard },
  { path: 'accounts', component: Accounts },
  { path: 'transactions', component: Transactions },
  { path: 'admin', component: Admin },
];

