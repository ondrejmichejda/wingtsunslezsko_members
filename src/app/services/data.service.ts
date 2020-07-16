import { Injectable } from '@angular/core';
import {DatabaseDataArtikls, DatabaseDataEvents, DatabaseDataVideo, DatabaseDataWtlog} from '../class/DatabaseData';
import { User } from '../class/User';
import { AlertService } from './alert.service';
import { AlertTexts } from '../enum/AlertTexts';
import { UserChat } from '../class/UserChat';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private alertService: AlertService, private httpService: HttpService) {
  }

  /* old */
  public GetVideoData(): DatabaseDataVideo {

    // create test data
    const testData = new DatabaseDataVideo();
    const urls: string[] = ['https://www.youtube.com/embed/Tq7Ovshz1UI', 'https://www.youtube.com/embed/tgbNymZ7vqY']

    for (let i = 0; i < 2; i++) {
      testData.AddData(i, 'Video ' + i, urls[i], 'Mr oh winding it enjoyed by between. The servants securing material goodness her. ' +
        'Saw principles themselves ten are possession. So endeavor to continue cheerful doubtful we to. Turned ' +
        'advice the set vanity why mutual. Reasonably if conviction on be unsatiable discretion apartments' +
        ' delightful. Are melancholy appearance stimulated occasional entreaties end. Shy ham had esteem happen' +
        ' active county. Winding morning am shyness evident to. Garrets because elderly new manners however one' +
        ' village she.  ' + i);
    }

    return testData;
  }

  public GetArtiklData(): DatabaseDataArtikls {

    // create test data
    const testData = new DatabaseDataArtikls();
    const testDesc = 'Mr oh winding it enjoyed by between. The servants securing material goodness her. ' +
        'Saw principles themselves ten are possession. So endeavor to continue cheerful doubtful we to. Turned ' +
        'advice the set vanity why mutual. Reasonably if conviction on be unsatiable discretion apartments' +
        ' delightful.';
    const deadLineDate: Date = new Date();
    deadLineDate.setTime(new Date().getDate() - (24 * 3600 * 1000));

    const endDate: Date = new Date();
    endDate.setTime(new Date().getDate() + (4 * 3600 * 1000));

    for (let i = 0; i < 10; i++) {
      testData.AddData(i, 'Artikl ' + i, testDesc, 10, 20, 15, 0, deadLineDate, false);
    }
    return testData;
  }

  public GetUserData(): User {

    // create test data
    const testData = new User();
    testData.name = 'Ondrej Michejda';

    testData.signedEvents.push(0, 0, 1);
    testData.confirmedEvents.push(0, 0, 0);
    testData.confirmedArtikls.push(0, 1, 0);

    testData.settings = [true, false, false, true, true];

    return testData;
  }

  public SetSignInUserToEvent(userId: number, eventId: number): boolean {
    // sing user to event
    const eventName = 'Událost 1';
    this.alertService.alert(AlertTexts.event_sign_in + eventName);
    return true;
  }

  public SetSignOutUserToEvent(userId: number, eventId: number): boolean {
    // sing user to event
    const eventName = 'Událost 1';
    this.alertService.alert(AlertTexts.event_sign_out + eventName);
    return true;
  }

  public SetSignInUserToArtikl(userId: number, eventId: number): boolean {
    // sing user to artikl
    const artiklName = 'Artikl 1';
    this.alertService.alert(AlertTexts.artikl_sign_in + artiklName);
    return true;
  }

  public SetSignOutUserToArtikl(userId: number, eventId: number): boolean {
    // sing user to artikl
    const eventName = 'Artikl 1';
    this.alertService.alert(AlertTexts.artikl_sign_out + eventName);
    return true;
  }

  public GetUserChat(userId: number): UserChat {
    // test data
    const userChat = new UserChat();

    for (let i = 0; i < 20; i++) {
      userChat.AddMsg(Math.random() > 0.5, new Date(), 'Random message! Hello Caarl.');

    }
    return userChat;
  }

  public SetUserSettings(userId: number, settings: Array<boolean>): boolean {
    this.alertService.alert(AlertTexts.settings_saved);
    return true;
  }
}

