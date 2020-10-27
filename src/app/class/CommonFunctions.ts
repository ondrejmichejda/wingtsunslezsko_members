export class CommonFunctions{

  static sqlToJsDate(sqlDate: string): Date{
    // sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    const sqlDateArr1 = sqlDate.split('-');
    // format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
    const sYear = Number(sqlDateArr1[0]);
    const sMonth = (Number(sqlDateArr1[1]) - 1);
    const sqlDateArr2 = sqlDateArr1[2].split(' ');
    // format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    const sDay = Number(sqlDateArr2[0]);
    const sqlDateArr3 = sqlDateArr2[1].split(':');
    // format of sqlDateArr3[] = ['hh','mm','ss.ms']
    const sHour = Number(sqlDateArr3[0]);
    const sMinute = Number(sqlDateArr3[1]);
    const sqlDateArr4 = sqlDateArr3[2].split('.');
    // format of sqlDateArr4[] = ['ss','ms']
    const sSecond = Number(sqlDateArr4[0]);
    // const sMillisecond = sqlDateArr4[1];
    return new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond);
  }

  static getDate(sqlDate: string): string {
    return this.sqlToJsDate(sqlDate).toLocaleDateString('cs-CZ');
  }

  static getDateTime(sqlDate: string): string {
    return this.sqlToJsDate(sqlDate).toLocaleString('cs-CZ');
  }

  static getDatePure(sqlDate: string): Date {
    return this.sqlToJsDate(sqlDate);
  }

  static getDateTimeFromInput(datetime: string): Date {
    const reggie = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;
    const dateArray = reggie.exec(datetime);
    const dateObject = new Date(
      (+dateArray[1]),
      (+dateArray[2])-1, // Careful, month starts at 0!
      (+dateArray[3]),
      (+dateArray[4]),
      (+dateArray[5])
    );
    return dateObject;
  }

  static getISODateTime(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`;
  }

  static getSchool(value: number): string {
    let result: string;
    switch(+value){
      case 0:
        result = 'Vše';
        break;
      case 1:
        result = 'Ostrava';
        break;
      case 2:
        result = 'Třinec';
        break;
      case 3:
        result = 'Český Těšín';
        break;
      case 4:
        result = 'Těrlicko';
        break;
      case 99:
        result = '';
        break;
      default:
        result = 'Undefined';
    }
    return result;
  }

  static getSchoolCode(value: string): number {
    let result: number;
    switch(this.slugify(value.toLowerCase())){
      case 'vse':
        result = 0;
        break;
      case 'ostrava':
        result = 1;
        break;
      case 'trinec':
        result = 2;
        break;
      case 'cesky-tesin':
        result = 3;
        break;
      case 'terlicko':
        result = 4;
        break;
      default:
        result = -1;
    }
    return result;
  }

  static getArticleTopic(topic: number): string{
    switch(Number(topic)){
      case 1:
        return 'Aktualita';
      case 2:
        return 'Kurz';
      case 3:
        return 'Wing Tsun';
      case 4:
        return 'Prevence';
      case 5:
        return 'Děti';
      default:
        return 'NUTNO DOPLNIT!';
    }
  }

  static getArticleTopicCode(topic: string): number{
    switch(this.slugify(topic.toLowerCase())){
      case 'aktualita':
        return 1;
      case 'kurz':
        return 2;
      case 'wing-tsun':
        return 3;
      case 'prevence':
        return 4;
      case 'deti':
        return 5;
      default:
        return -1;
    }
  }

  static getVideoCategory(cat: number): string {
    switch (+cat) {
      case 1:
        return 'Forma';
      case 2:
        return 'Principy';
      case 3:
        return 'Trénink';
      case 4:
        return 'Ostatní';
      default:
        return 'Nenastaveno';
    }
  }

  static getVideoCategoryCode(cat: string): number {
    switch (this.slugify(cat.toLowerCase())) {
      case 'forma':
        return 1;
      case 'principy':
        return 2;
      case 'trenink':
        return 3;
      case 'ostatni':
        return 4;
      default:
        return -1;
    }
  }

  static ValidateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static ShortText(text: string, length: number) : string {
    let result: string
    if(text.length <= length){
      result = text;
    }
    else{
      result = text.substr(0, length -3) + '...';
    }
    return result;
  }

  static slugify(str: string): string {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return str.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }
}


