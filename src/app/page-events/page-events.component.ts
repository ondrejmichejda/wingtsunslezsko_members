import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import {HttpService} from '../services/http.service';
import {WTEvent} from '../class/data/WTEvent';
import {WTEventRegistration} from '../class/data/WTEventRegistration';
import {DatastorageService} from '../services/datastorage.service';
import {DeviceService} from '../services/device.service';
import {AlertService} from '../services/alert.service';
import {SnackType} from '../enum/SnackType';
import {AlertTexts} from '../enum/AlertTexts';
import {LogService, Role, Section} from '../services/log.service';
import {CommonFunctions} from '../class/CommonFunctions';

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
  signing = false;
  identifyer = (index:number, item: any) => item.name;

  constructor(private headerService: HeaderService,
              private httpService: HttpService,
              private dataStorage: DatastorageService,
              private device: DeviceService,
              private alertService: AlertService,
              private log: LogService) {
    this.headerService.setTitle('Události');
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.httpService.getEvents(this.dataStorage.Member.school).subscribe(
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
              this.signing = false;
            });
          },
          (err) => {
            this.log.Error(Section.Video, 'Chyba načtení událostí.', undefined, err);
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

  public signIn(event: WTEvent){
    this.log.Info(Section.Event, `Kliknutí na přihlášení události : ${event.name} (${event.id})`);
    if(this.canSign(event)) {
      this.signing = true;
      this.httpService.signIn(event.id, this.dataStorage.Member.id, event.autoconfirm).subscribe(
        (res: boolean) => {
          this.log.Info(Section.Event, `Přihlášení na událost: ${event.name} (${event.id})`,
            undefined, `Limity: ${event.members}/${event.confirmed}/${event.memberlimit} | Autopřihlášení: ${!!event.autoconfirm}`);
          this.alertService.alert(AlertTexts.event_sign_in + event.name, SnackType.info);
          this.getEvents();
        },
        (err) => {
          this.log.Error(Section.Event, `Přihlášení na událost : ${event.name} (${event.id}) selhalo`, err);
          this.alertService.alert(AlertTexts.fail, SnackType.error);
          this.signing = false;
        });
    }
    else {
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    }
  }

  public canSign(event: WTEvent): boolean {
    const school = +event.school === 0 || +this.dataStorage.Member.school === 0 || +event.school === +this.dataStorage.Member.school;
    const time = this.dateTimeNow < this.GetDate(event.datetimeDeadline);
    const limit = +event.confirmed < +event.memberlimit || +event.memberlimit === 0;
    const notsigned = event.regStatus === 0;
    return school && time && limit && notsigned && !this.signing;
  }

  public signOut(event: WTEvent){
    this.log.Info(Section.Event, `Kliknutí na odhlášení z události : ${event.name} (${event.id})`);
    this.httpService.signOut(event.id, this.dataStorage.Member.id).subscribe(
      (res: boolean) => {
        this.log.Info(Section.Event, `Odhlášení z události: ${event.name} (${event.id})`,
          undefined, `Limity: ${event.members}/${event.confirmed}/${event.memberlimit}`);
        this.alertService.alert(AlertTexts.event_sign_out + event.name, SnackType.info);
        this.getEvents();
      },
      (err) => {
        this.log.Error(Section.Event, `Odhlášení z události : ${event.name} (${event.id}) selhalo`, err);
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  public GetDate(date: string): Date{
    return CommonFunctions.sqlToJsDate(date);
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
