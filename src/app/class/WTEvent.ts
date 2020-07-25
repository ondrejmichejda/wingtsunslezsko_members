import {Convert} from './Convert';

export class WTEvent {

  id: number;
  datetime: Date;
  name: string;
  school: number;
  location: string;
  prize: string;
  description: string;
  memberlimit: number;
  memberlimitMin: number;
  members: number;
  notconfirmed: number;
  datetimeStart: string;
  datetimeDeadline: string;
  datetimeEnd: string;

  regStatus = 0;
  get dtDeadline(): Date{
    return Convert.sqlToJsDate(this.datetimeDeadline);
  }

  constructor(
    id: number,
    datetime: Date,
    name: string,
    school: number,
    location: string,
    prize: string,
    description: string,
    memberlimit: number,
    memberlimitMin: number,
    members: number,
    notconfirmed: number,
    datetimeStart: string,
    datetimeDeadline: string,
    datetimeEnd: string) {

    this.id = id;
    this.datetime = datetime;
    this.name = name;
    this.school = school;
    this.location = location;
    this.prize = prize;
    this.description = description;
    this.memberlimit = memberlimit;
    this.memberlimitMin = memberlimitMin;
    this.members = members;
    this.notconfirmed = notconfirmed;
    this.datetimeStart = datetimeStart;
    this.datetimeDeadline = datetimeDeadline;
    this.datetimeEnd = datetimeEnd;
  }
}
