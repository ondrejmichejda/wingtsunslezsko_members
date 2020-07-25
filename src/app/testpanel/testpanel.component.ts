import { Component, OnInit } from '@angular/core';
import {UserAuthenticationService} from '../services/user-authentication.service';
import {MenuService} from '../services/menu.service';

@Component({
  selector: 'app-testpanel',
  templateUrl: './testpanel.component.html',
  styleUrls: ['./testpanel.component.css']
})
export class TestpanelComponent implements OnInit {

  set login_cb(value) {
    if (value) {
      // this.userAuthService.login('Ondrej Michejda');
    } else {
      this.userAuthService.logout();
    }
  }

  get login_cb() {
    return this.userAuthService.isLogged();
  }

  set admin_cb(value) {
    if (value) {
      this.userAuthService.loginAdmin();
    } else {
      this.userAuthService.logoutAdmin();
    }
  }

  get admin_cb() {
    return this.userAuthService.isLoggedAdmin();
  }

  constructor(private userAuthService: UserAuthenticationService,
              private menuService: MenuService) { }

  ngOnInit() {
  }

}
