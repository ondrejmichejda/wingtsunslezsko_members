import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private _mobileTrigger = 500;

  constructor() { }

  public IsMobile(): boolean{
    return window.innerWidth < this._mobileTrigger;
  }

  public GetWindowWidth(): number{
    return window.innerWidth;
  }
}
