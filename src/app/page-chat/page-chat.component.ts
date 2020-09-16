import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';

@Component({
  selector: 'app-page-chat',
  templateUrl: './page-chat.component.html',
  styleUrls: ['./page-chat.component.css']
})
export class PageChatComponent implements OnInit {

  chatBox: HTMLElement;

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setTitle('Chat');
  }
}
