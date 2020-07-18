import {Component, OnInit, ViewChild} from '@angular/core';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  pwdHide = true;
  formLogin = '';
  formPwd = '';

  constructor(private userAuthService: UserAuthenticationService) {
  }

  ngOnInit() {
  }

  public _buttonClicked() {
    this.userAuthService.login(this.formLogin);
  }
}
