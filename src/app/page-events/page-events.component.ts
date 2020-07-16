import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {HttpService} from '../services/http.service';
import {WTEvent} from '../class/WTEvent';

@Component({
  selector: 'app-page-events',
  templateUrl: './page-events.component.html',
  styleUrls: ['./page-events.component.css']
})
export class PageEventsComponent implements OnInit {

  now = new Date();
  events: WTEvent[];
  error = '';

  constructor(private headerService: HeaderService,
              private httpService: HttpService) {
    this.headerService.setTitle('Události');
  }

  /*public GetEventStatus(eventId: number): number {
    let status = 0; // not signed event

    if (this.user.confirmedEvents.indexOf(eventId) > -1) {
      status = 2; // confirmed event
    } else if (this.user.signedEvents.indexOf(eventId) > -1) {
      status = 1; // signed event
    }

    return status;
  }

  public GetEventStatusText(eventId: number): string {
    return EventState[this.GetEventStatus(eventId)];
  }*/

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.httpService.getEvents().subscribe(
      (res: WTEvent[]) => {
        this.events = res;
        console.log(res);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  public signIn(){
    throw new Error('Not implemented.');
  }

}

enum EventState {
  'Nepřihlášen',
  'Čeká na potvrzení',
  'Přihlášen',
}
