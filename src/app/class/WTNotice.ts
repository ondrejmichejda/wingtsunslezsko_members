export class WTNotice {

  public id: number;
  public datetime: Date;
  public school: number;
  public text: string;
  public color: string;

  constructor(
    id: number,
    datetime: Date,
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
