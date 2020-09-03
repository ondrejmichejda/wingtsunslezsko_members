export class WTImage {

  public id: number;
  public articleId: number;
  public url: string;
  public visible: boolean;

  constructor(
    id: number,
    articleId: number,
    url: string,
    visible: boolean) {

      this.id= id;
      this.articleId = articleId;
      this.url = url;
      this.visible = visible;
  }
}
