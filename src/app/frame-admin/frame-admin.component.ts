import { Component, OnInit } from '@angular/core';
import { ComplexBtn } from '../class/ComplexBtn';
import {FrameAdminService} from '../services/frame-admin.service';

@Component({
  selector: 'app-frame-admin',
  templateUrl: './frame-admin.component.html',
  styleUrls: ['./frame-admin.component.css']
})
export class FrameAdminComponent implements OnInit {

  public btnArray: Array<ComplexBtn>;

  constructor(private frameAdmin: FrameAdminService) {}


  ngOnInit(): void {
    this.btnArray = this.frameAdmin.NoticeBoard();
  }

}
