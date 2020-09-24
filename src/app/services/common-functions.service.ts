import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {

  constructor() { }

  getSchool(value: number): string {
    let result: string;
    switch(+value){
      case 0:
        result = 'Vše';
        break;
      case 1:
        result = 'Ostrava';
        break;
      case 2:
        result = 'Třinec';
        break;
      case 3:
        result = 'Český Těšín';
        break;
      case 4:
        result = 'Těrlicko';
        break;
      default:
        result = 'Undefined';
    }
    return result;
  }

  ValidateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  ShortText(text: string, length: number) : string {
    let result: string
    if(text.length <= length){
      result = text;
    }
    else{
      result = text.substr(0, length -3) + '...';
    }
    return result;
  }
}
