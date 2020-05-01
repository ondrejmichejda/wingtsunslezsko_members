import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  hide = true;

  constructor(private formBuilder: FormBuilder,
              public userAuthService: UserAuthenticationService) { }

  ngOnInit() {
  }

}
