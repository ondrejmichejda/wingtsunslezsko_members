import {Component, OnInit} from '@angular/core';
import { DataService } from '../services/data.service';
import {HeaderService} from '../services/header-title-change.service';

@Component({
  selector: 'app-page-events',
  templateUrl: './page-events.component.html',
  styleUrls: ['./page-events.component.css']
})
export class PageEventsComponent implements OnInit {

  events = this.dataService.GetEventData().Data;
  user = this.dataService.GetUserData();
  now = new Date();

  constructor(private dataService: DataService,
              private headerService: HeaderService) {
  }

  private GetEventStatus(eventId: number): number {
    let status = 0; // not signed event

    if (this.user.confirmedEvents.indexOf(eventId) > -1) {
      status = 2; // confirmed event
    } else if (this.user.signedEvents.indexOf(eventId) > -1) {
      status = 1; // signed event
    }

    return status;
  }

  private GetEventStatusText(eventId: number): string {
    return EventState[this.GetEventStatus(eventId)];
  }

  ngOnInit() {
    this.headerService.setTitle('Události');
  }

}

enum EventState {
  'Nepřihlášen',
  'Čeká na potvrzení',
  'Přihlášen',
}
