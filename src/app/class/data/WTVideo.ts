export class WTVideo {

  public id: number;
  public datetime: string;
  public name: string;
  public category: number;
  public description: string;
  public link: string;
  public visible: boolean;


  constructor(
    id: number,
    datetime: string,
    name:string,
    category: number,
    description: string,
    link: string,
    visible: boolean) {

      this.id= id;
      this.datetime= datetime;
      this.name = name;
      this.category = category;
      this.description = description;
      this.link = link;
      this.visible= visible;
  }
}
