import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExceptionsService {

  constructor() { }

  private exception(msg: string) {
    alert(msg);
  }

  public NotImplemented(){
    this.exception('Není implementováno');
  }
}
