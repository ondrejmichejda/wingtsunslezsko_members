import { Injectable } from '@angular/core';
import { ComplexBtn } from '../class/ComplexBtn';

@Injectable({
  providedIn: 'root'
})
export class FrameAdminService {

  constructor() { }

  public NoticeBoard(): Array<ComplexBtn> {
    const btns: Array<ComplexBtn> = new Array<ComplexBtn>();
    /* Add */
    btns.push(new ComplexBtn('Nový', () => {alert('pridavam...'); }));
    return btns;
  }
}
