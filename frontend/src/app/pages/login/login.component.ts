import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { menuNames } from '../../../util/menuNames';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router);

  goToRegister() {
    this.router.navigate([menuNames.register.path]);
  }
}
