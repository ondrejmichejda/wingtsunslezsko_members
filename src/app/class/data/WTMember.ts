
export class WTMember{

  id: number;
  login: string;
  pwd: string;
  name: string;
  surname: string;
  school: number;
  news: string;
  admin: boolean;

  constructor(
    id: number,
    login: string,
    pwd: string,
    name: string,
    surname: string,
    school: number,
    news: string,
    admin: boolean) {

    this.id = id;
    this.login = login;
    this.pwd = pwd;
    this.name = name;
    this.surname = surname;
    this.school = school;
    this.news = news;
    this.admin = admin;
  }
}
