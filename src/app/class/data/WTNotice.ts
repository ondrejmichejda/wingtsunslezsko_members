export class WTNotice {

  public id: number;
  public datetime: string;
  public school: number;
  public text: string;
  public color: string;

  constructor(
    id: number,
    datetime: string,
    school: number,
    text: string,
    color: string) {

    this.id = id;
    this.datetime = datetime;
    this.school = school;
    this.text = text;
    this.color = color;
  }
}
