import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {WTLog} from '../class/data/WTLog';
import {DatastorageService} from './datastorage.service';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {CommonFunctions} from '../class/CommonFunctions';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private httpService: HttpService,
              private dataStorage: DatastorageService) { }

  private _base(role: Role, section: Section, info1: string, city = 99, info2 = ''): WTLog {
    const log = new WTLog(0, '', this.dataStorage.Member.id, '', role, section, city, info1, info2);
    return log;
  }

  private _save(log: WTLog) {
    this.httpService.createLog_post(log).subscribe(
      (res) => {},
      (err) => {console.log(err);}
    );
  }

  public Error(section: Section, info1: string, city = 99, info2 = '') {
    const log = this._base(Role.User, section, info1, city, info2);
    log.type = Type.Error;
    console.log(info2);
    this._save(log);
  }

  public Warning(section: Section, info1: string, city = 99, info2 = '') {
    const log = this._base(Role.User, section, info1, city, info2);
    log.type = Type.Warning;
    this._save(log);
  }

  public Info(section: Section, info1: string, city = 99, info2 = '') {
    const log = this._base(Role.User, section, info1, city, info2);
    log.type = Type.Info;
    this._save(log);
  }

  public aError(section: Section, info1: string, city = 99, info2 = '') {
    const log = this._base(Role.Admin, section, info1, city, info2);
    log.type = Type.Error;
    console.log(info2);
    this._save(log);
  }

  public aWarning(section: Section, info1: string, city = 99, info2 = '') {
    const log = this._base(Role.Admin, section, info1, city, info2);
    log.type = Type.Warning;
    this._save(log);
  }

  public aInfo(section: Section, info1: string, city = 99, info2 = '') {
    const log = this._base(Role.Admin, section, info1, city, info2);
    log.type = Type.Info;
    this._save(log);
  }
}

// error type
export enum Type {
  Error = 'Chyba',
  Warning = 'Varování',
  Info = 'Informace'
}

// role type
export enum Role {
  Admin = 'Admin',
  User = 'Člen'
}

// section type
export enum Section {
  Login = 'Přihlašování',
  Notice = 'Nástěnka',
  Event = 'Události',
  Video = 'Video',
  Settings = 'Nastavení',
  Article = 'Články',
  Member = 'Členové'
}
