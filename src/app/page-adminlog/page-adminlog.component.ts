import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {HttpService} from '../services/http.service';
import {AlertService} from '../services/alert.service';
import {WTLog} from '../class/data/WTLog';
import {MatTableDataSource} from '@angular/material/table';
import {Type} from '../services/log.service';
import {MatPaginator} from '@angular/material/paginator';
import {WTLogExt} from '../class/data/WTLogExt';

@Component({
  selector: 'app-page-adminlog',
  templateUrl: './page-adminlog.component.html',
  styleUrls: ['./page-adminlog.component.css']
})
export class PageAdminlogComponent implements OnInit {

  error = '';
  displayedColumns: string[] = ['datetime', 'role', 'user', 'section', 'city', 'info1', 'info2'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private headerService: HeaderService,
              private httpService: HttpService,
              private alertService: AlertService) {
    this.headerService.setTitle('System Log');
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

  // Data workflows
  getLogs(): void {
    this.httpService.getLogs().subscribe(
      (logs: WTLogExt[]) => {
        console.log(logs);
        this.dataSource = new MatTableDataSource(logs);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.error = err;
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }
}
