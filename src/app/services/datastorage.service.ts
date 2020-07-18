import { Injectable } from '@angular/core';
import {WTMember} from '../class/WTMember';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  private _member: WTMember;
  private _memberKey = 'member';
  get Member():WTMember{
    this._member = this.load<WTMember>(this._memberKey);
    return this._member;
  }
  set Member(member){
    this._member = member;
    this.save(this._member, this._memberKey);
  }

  constructor() {
  }

  public save(item: any, key): void{
    // console.log('save:' + this._storageId);
    sessionStorage.setItem(key, JSON.stringify(item));
  }

  public load<T>(key: string): T{
    const item: T = JSON.parse(sessionStorage.getItem(key));
    return item;
  }

}
