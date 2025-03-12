import { Routes } from '@angular/router';
import { menuNames } from '../util/menuNames';

export const routes: Routes = [
  {
    path: menuNames.login.path,
    redirectTo: menuNames.login.path,
    pathMatch: 'full',
  },
  {
    path: menuNames.login.path,
    title: menuNames.login.name,
    loadComponent: () =>
      import('./pages/login/login.component').then(
        (module) => module.LoginComponent
      ),
  },
  {
    path: menuNames.register.path,
    title: menuNames.register.name,
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (module) => module.RegisterComponent
      ),
  },
];
