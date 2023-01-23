import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { FbservisService } from './services/fbservis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$ = this.usersService.currentUserProfile$;

  constructor(
    public authService: AuthenticationService,
    public fbServis: FbservisService,
    public router: Router,
    public usersService: UsersService
  ) {}

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
