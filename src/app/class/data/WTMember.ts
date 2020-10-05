
export class WTMember{

  id: number;
  datetime: string;
  login: string;
  pwd: string;
  name: string;
  surname: string;
  school: number;
  news: string;
  logged: string;
  admin: boolean;

  constructor(
    id: number,
    datetime: string,
    login: string,
    pwd: string,
    name: string,
    surname: string,
    school: number,
    news: string,
    logged: string,
    admin: boolean) {

    this.id = id;
    this.datetime = datetime;
    this.login = login;
    this.pwd = pwd;
    this.name = name;
    this.surname = surname;
    this.school = school;
    this.news = news;
    this.logged = logged;
    this.admin = admin;
  }
}
