import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { MenuService } from '../services/menu.service';
import { HeaderService } from '../services/header-title-change.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  title = '';

  constructor(private breakpointObserver: BreakpointObserver,
              public userAuthService: UserAuthenticationService,
              private menuService: MenuService,
              private headerService: HeaderService) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.headerService.title.subscribe(title => {
      this.title = title;
    });
  }
}
