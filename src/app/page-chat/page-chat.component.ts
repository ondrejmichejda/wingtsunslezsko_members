import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import {HeaderService} from '../services/header-title-change.service';

@Component({
  selector: 'app-page-chat',
  templateUrl: './page-chat.component.html',
  styleUrls: ['./page-chat.component.css']
})
export class PageChatComponent implements OnInit, AfterViewInit {

  UserChat = this.dataService.GetUserChat(0).Data;
  User = this.dataService.GetUserData();

  chatBox: HTMLElement;

  constructor(private dataService: DataService,
              private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setTitle('Chat');

  }

  ngAfterViewInit() {
    this.ScrollChatDown();
  }

  public ScrollChatDown(): void {
    this.chatBox = document.getElementById('chat-box');
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }

  public GetClass(me: boolean): string {
    return me ? 'chat-me' : '';
  }
}
