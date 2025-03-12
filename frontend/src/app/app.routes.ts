import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Routes } from '@angular/router';
import { menuNames } from '../util/menuNames';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  {
    path: '',
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
  {
    path: "tab",
    title: "Tab",
    component: UserFormComponent
  }

];
