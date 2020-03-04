import { Component } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Authentication';
  constructor(private authenticationService: AuthenticationService, private router: Router){
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login'])
  }
}
