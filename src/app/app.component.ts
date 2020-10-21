import {Component, HostListener} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {UserAuthenticationService} from './services/user-authentication.service';
import {LogService, Section} from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router,
              public userAuthService: UserAuthenticationService,
              private log: LogService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (!userAuthService.isLogged()) {
          this.router.navigate(['']);
        }
      }
    });
  }
}
