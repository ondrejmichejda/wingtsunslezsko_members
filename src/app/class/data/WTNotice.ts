export class WTNotice {

  public id: number;
  public datetime: string;
  public school: number;
  public head: string;
  public text: string;
  public color: string;
  public visible: boolean;

  constructor(
    id: number,
    datetime: string,
    school: number,
    head: string,
    text: string,
    color: string,
    visible: boolean) {

    this.id = id;
    this.datetime = datetime;
    this.school = school;
    this.head = head;
    this.text = text;
    this.color = color;
    this.visible = visible;
  }
}
