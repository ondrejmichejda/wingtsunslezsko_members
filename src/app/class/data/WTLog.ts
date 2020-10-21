export class WTLog {

  public id: number;
  public datetime: string;
  public user: number;
  public type: string;
  public role: string;
  public section: string;
  public city: number;
  public info1: string;
  public info2: string;

  constructor(
    id: number,
    datetime: string,
    user: number,
    type: string,
    role: string,
    section: string,
    city: number,
    info1: string,
    info2: string) {
      this.id = id;
      this.datetime = datetime;
      this.user = user;
      this.type = type;
      this.role = role;
      this.section = section;
      this.city = city;
      this.info1 = info1;
      this.info2 = info2;
  }
}
