
export class WTMembersOnEvent{

  id: number;
  datetime: string;
  login: string;
  name: string;
  surname: string;
  confirmed: boolean;
  present: boolean;
  guest: boolean;
  guestName: string;
  guestSurname: string;

  constructor(
    id: number,
    datetime: string,
    login: string,
    name: string,
    surname: string,
    confirmed: boolean,
    present: boolean,
    guest: boolean,
    guestName: string,
    guestSurname: string) {

    this.id = id;
    this.datetime = datetime;
    this.login = login;
    this.name = name;
    this.surname = surname;
    this.confirmed = confirmed;
    this.present = present;
    this.guest = guest;
    this.guestName = guestName;
    this.guestSurname = guestSurname;
  }
}
