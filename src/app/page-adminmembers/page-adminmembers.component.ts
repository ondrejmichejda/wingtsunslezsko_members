import { Component, OnInit } from '@angular/core';
import {WTMember} from '../class/data/WTMember';
import {WTEvent} from '../class/data/WTEvent';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {HttpService} from '../services/http.service';
import {AlertService} from '../services/alert.service';
import {HeaderService} from '../services/header-title-change.service';

@Component({
  selector: 'app-page-adminmembers',
  templateUrl: './page-adminmembers.component.html',
  styleUrls: ['./page-adminmembers.component.css']
})
export class PageAdminmembersComponent implements OnInit {

  member: WTMember
  constructor(private httpService: HttpService,
              private alertService: AlertService,
              private headerService: HeaderService) {
    this.headerService.setTitle('Správa členů');
  }

  ngOnInit(): void {
    this.initMember();
  }

  addMember() {
    this.httpService.createMember_post(this.member).subscribe(data => {
      this.alertService.alert(AlertTexts.member_created, SnackType.info);
      this.initMember();
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  initMember(){
    this.member = new WTMember(0,'','','', '', '', 0, '', false);
  }
}
