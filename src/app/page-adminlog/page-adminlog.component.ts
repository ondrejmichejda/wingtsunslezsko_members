import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {HttpService} from '../services/http.service';
import {AlertService} from '../services/alert.service';
import {WTLog} from '../class/data/WTLog';
import {MatTableDataSource} from '@angular/material/table';
import {Section, Type} from '../services/log.service';
import {WTLogExt} from '../class/data/WTLogExt';
import {CommonFunctions} from '../class/CommonFunctions';

@Component({
  selector: 'app-page-adminlog',
  templateUrl: './page-adminlog.component.html',
  styleUrls: ['./page-adminlog.component.css']
})
export class PageAdminlogComponent implements OnInit {

  error = '';
  displayedColumns: string[] = ['datetime', 'user', 'role', 'section', 'city', 'info1', 'info2'];
  dataSource;
  common = CommonFunctions;
  ender = false;

  // filters
  usedFilters = '';
  startFilter = '2000-01-01T00:00';
  endFilter = '';
  userFilter = '';
  roleFilter = 'all';
  sectionFilter = 'all';
  schoolFilter = '101';
  info1Filter = '';
  info2Filter = '';
  showErrors = true;
  showWarnings = true;
  showInfos = true;
  showLogin = false;

  showLoading = false;

  constructor(private headerService: HeaderService,
              private httpService: HttpService,
              private alertService: AlertService) {
    this.headerService.setTitle('System Log');
    this.clearFilter();
  }

  ngOnInit(): void {
    this.getLogs();
  }

  getClass(log: WTLog): string {
    switch (log.type){
      case Type.Error:
        return 'error';
      case Type.Warning:
        return 'warning';
      default:
        return '';
    }
  }

  combineUser(log: WTLogExt): string {
    return `${log.userName} ${log.userSurname} (${log.userLogin})`;
  }

  onScroll(){
    
  }

  // Data workflows
  getLogs(): void {
    this.showLoading = true;
    this.httpService.getLogs().subscribe(
      (logs: WTLogExt[]) => {
        this.dataSource = new MatTableDataSource(this.filter(logs));
        this.showLoading = false;
      },
      (err) => {
        this.error = err;
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  filter(logs: WTLogExt[]): WTLogExt[]{
    this.usedFilters = 'Čas, ';

    // type
    if(!this.showErrors){
      logs = logs.filter(log =>
        log.type !== Type.Error
      );
    }
    if(!this.showWarnings){
      logs = logs.filter(log =>
        log.type !== Type.Warning
      );
    }
    if(!this.showInfos){
      logs = logs.filter(log =>
        log.type !== Type.Info
      );
    }

    // start and end
    logs = logs.filter(log =>
      this.common.getDatePure(log.datetime) >= this.common.getDateTimeFromInput(this.startFilter) &&
      this.common.getDatePure(log.datetime) <= this.common.getDateTimeFromInput(this.endFilter)
    );

    // user
    if(this.userFilter !== '') {
      this.usedFilters += 'Člen, ';
      logs = logs.filter(
        log => this.common.slugify(this.combineUser(log).toLowerCase()).includes(this.userFilter.toLowerCase()));
    }

    // role
    if(this.roleFilter !== 'all') {
      this.usedFilters += 'Role, ';
      logs = logs.filter(
        log => log.role === this.roleFilter);
    }

    // section
    if(this.sectionFilter !== 'all') {
      this.usedFilters += 'Sekce, ';
      logs = logs.filter(
        log => log.section === this.sectionFilter);
    }

    // school
    if(this.schoolFilter !== '101') {
      this.usedFilters += 'Škola, ';
      logs = logs.filter(
        log => +log.city === +this.schoolFilter);
    }

    // info1
    if(this.info1Filter !== '') {
      this.usedFilters += 'Info1, ';
      logs = logs.filter(
        log => this.common.slugify(log.info1.toLowerCase()).includes(this.info1Filter.toLowerCase()));
    }

    // info2
    if(this.info2Filter !== '') {
      this.usedFilters += 'Info2, ';
      logs = logs.filter(
        log => this.common.slugify(log.info2.toLowerCase()).includes(this.info2Filter.toLowerCase()));
    }

    // login
    if(!this.showLogin){
      logs = logs.filter(log =>
        log.section !== Section.Login
      );
    }

    this.usedFilters = this.usedFilters.substr(0, this.usedFilters.length - 2) + ` (${logs.length})`;
    return logs;
  }

  clearFilter() {
    this.startFilter = '2000-01-01T00:00';
    const act = new Date();
    act.setHours(act.getHours() + 1);
    this.endFilter = act.toISOString().substr(0, 16);
    this.userFilter = '';
    this.roleFilter = 'all';
    this.sectionFilter = 'all';
    this.schoolFilter = '101';
    this.info1Filter = '';
    this.info2Filter = '';
    this.usedFilters = '';
    this.showErrors = true;
    this.showWarnings = true;
    this.showInfos = true;
    this.showLogin = false;
    this.getLogs();
  }

  getFriedlyDate(dbDate: string): string {
    let result = this.common.getDateTime(dbDate);
    const dDate = this.common.getDatePure(dbDate);
    const actDate = new Date();
    if(dDate.getDate() === actDate.getDate()) {
      result = `Dnes ${dDate.toLocaleTimeString('cs-CZ')}`;
    }
    else if(dDate.getDate() === actDate.getDate() - 1) {
      result = `Včera ${dDate.toLocaleTimeString('cs-CZ')}`;
    }
    return result;
  }
}
