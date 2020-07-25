import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {HttpService} from '../services/http.service';
import {WTEvent} from '../class/WTEvent';
import {WTEventRegistration} from '../class/WTEventRegistration';
import {DatastorageService} from '../services/datastorage.service';
import {Convert} from '../class/Convert';
import {DeviceService} from '../services/device.service';

@Component({
  selector: 'app-page-events',
  templateUrl: './page-events.component.html',
  styleUrls: ['./page-events.component.css']
})
export class PageEventsComponent implements OnInit {

  now = new Date();
  events: WTEvent[];
  eventsRegistrations: WTEventRegistration[];
  error = '';
  dateTimeNow = new Date();

  constructor(private headerService: HeaderService,
              private httpService: HttpService,
              private dataStorage: DatastorageService,
              private device: DeviceService) {
    this.headerService.setTitle('Události');
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.httpService.getEvents().subscribe(
      (events: WTEvent[]) => {
        this.events = events;
        this.httpService.getEventsRegistrations(this.dataStorage.Member.id, true).subscribe(
          (regs: WTEventRegistration[]) => {
            this.eventsRegistrations = regs;
            events.forEach((event) => {
              const reg = regs.find(x => x.eventId === event.id);
              if(reg !== undefined) {
                event.regStatus = String(reg.confirmed) === '1' ? 2 : 1;
              }
              else{
                event.regStatus = 0;
              }
            });
          },
          (err) => {
            this.error = err;
          }
        );
      },
      (err) => {
        this.error = err;
      }
    );
  }

  public getRegStatus(event: WTEvent): EventStatus{
    const status = new EventStatus(event.regStatus);
    return status;
  }

  public AdjustText(text: string): string{
    const trigger = 25;
    let result = text;
    if(this.device.IsMobile())
      if(text.length > trigger)
        result = text.substr(0, trigger - 3) + '...';

    return result;
  }

  public signIn(){
    throw new Error('Not implemented.');
  }

  public GetDate(date: string): Date{
    return Convert.sqlToJsDate(date);
  }

}

class EventStatus{
  get Text(): string{
    switch(this._state){
      case 0:
        return 'Nepřihlášen';
      case 1:
        return 'Čeká na potvrzení';
      case 2:
        return 'Přihlášen';
    }
  }

  get Icon(): string{
    switch (this._state) {
      case 0:
        return 'panorama_fish_eye';
      case 1:
        return 'error';
      case 2:
        return 'check_circle';
    }
  }

  get Color(): string{
    switch (this._state) {
      case 0:
        return 'primary';
      case 1:
        return 'warn';
      case 2:
        return 'primary';
    }
  }

  private _state: number;

  constructor(state: number){
    this._state = state;
  }
}
