import { Injectable } from '@angular/core';
import {WTMember} from '../class/data/WTMember';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  private _member: WTMember;
  private _memberKey = 'member';
  get Member():WTMember{
    this._member = this._load<WTMember>(this._memberKey);
    return this._member;
  }
  set Member(member){
    if(member === null){
      this._delete(this._memberKey);
    }else{
      this._member = member;
      this._save(this._member, this._memberKey);
    }
  }

  constructor() {
  }

  private _save(item: any, key): void{
    // console.log('save:' + this._storageId);
    sessionStorage.setItem(key, JSON.stringify(item));
  }

  private _load<T>(key: string): T{
    const item: T = JSON.parse(sessionStorage.getItem(key));
    return item;
  }

  private _delete(key: string){
    sessionStorage.removeItem(key);
  }

}
