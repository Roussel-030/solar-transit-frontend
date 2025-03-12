import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { menuNames } from '../../../util/menuNames';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private router = inject(Router);

  goToLogin() {
    this.router.navigate([menuNames.login.path]);
  }
}
