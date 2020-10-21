export class WTLogExt {

  public id: number;
  public datetime: string;
  public userId: number;
  public userLogin: string;
  public userName: string;
  public userSurname: string;
  public type: string;
  public role: string;
  public section: string;
  public city: number;
  public info1: string;
  public info2: string;

  constructor(
    id: number,
    datetime: string,
    userId: number,
    userLogin: string,
    userName: string,
    userSurname: string,
    type: string,
    role: string,
    section: string,
    city: number,
    info1: string,
    info2: string) {
      this.id = id;
      this.datetime = datetime;
      this.userId = userId;
      this.userLogin = userLogin;
      this.userName = userName;
      this.userSurname = userSurname;
      this.type = type;
      this.role = role;
      this.section = section;
      this.city = city;
      this.info1 = info1;
      this.info2 = info2;
  }
}
