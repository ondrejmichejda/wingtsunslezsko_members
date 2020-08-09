export class WTArticle {

  public id: number;
  public datetime: string;
  public topic: number;
  public url: string;
  public keywords: string;
  public metadesc: string;
  public name: string;
  public short: string;
  public pic: string;
  public text: string;
  public releaseDatetime: string;
  public visible: boolean;

  constructor(
    id: number,
    datetime: string,
    topic: number,
    url: string,
    keywords: string,
    metadesc: string,
    name: string,
    short: string,
    pic: string,
    text: string,
    releaseDatetime: string,
    visible: boolean) {

      this.id= id;
      this.datetime= datetime;
      this.topic= topic;
      this.url= url;
      this.keywords= keywords;
      this.metadesc= metadesc;
      this.name= name;
      this.short= short;
      this.pic= pic;
      this.text= text;
      this.releaseDatetime= releaseDatetime;
      this.visible= visible;
  }
}
