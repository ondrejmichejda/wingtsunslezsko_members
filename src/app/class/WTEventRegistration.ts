export class WTEventRegistration {

  id: number;
  datetime: Date;
  eventId: number;
  userId: number;
  confirmed: boolean;
  notpresent: boolean;
  guest: boolean;
  guestName: string;
  guestSurname: string;

  constructor(
    id: number,
    datetime: Date,
    eventId: number,
    userId: number,
    confirmed: boolean,
    notpresent: boolean,
    guest: boolean,
    guestName: string,
    guestSurname: string) {

    this.id = id;
    this.datetime = datetime;
    this.eventId = eventId;
    this.userId = userId;
    this.confirmed = confirmed;
    this.notpresent = notpresent;
    this.guest = guest;
    this.guestName = guestName;
    this.guestSurname = guestSurname;
  }
}
