import {Convert} from '../Convert';

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
  confirmed: number;
  present: number;
  datetimeStart: string;
  datetimeDeadline: string;
  datetimeEnd: string;
  visible: boolean;

  regStatus = 0;

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
    confirmed: number,
    present: number,
    datetimeStart: string,
    datetimeDeadline: string,
    datetimeEnd: string,
    visible: boolean) {

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
    this.confirmed = confirmed;
    this.datetimeStart = datetimeStart;
    this.datetimeDeadline = datetimeDeadline;
    this.datetimeEnd = datetimeEnd;
    this.visible = visible;
  }
}
