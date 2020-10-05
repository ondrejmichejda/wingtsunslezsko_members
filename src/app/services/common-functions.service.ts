import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {

  constructor() { }

  getSchool(value: number): string {
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
      default:
        result = 'Undefined';
    }
    return result;
  }

  getSchoolCode(value: string): number {
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

  getArticleTopic(topic: number): string{
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

  getArticleTopicCode(topic: string): number{
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

  getVideoCategory(cat: number): string {
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

  getVideoCategoryCode(cat: string): number {
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

  ValidateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  ShortText(text: string, length: number) : string {
    let result: string
    if(text.length <= length){
      result = text;
    }
    else{
      result = text.substr(0, length -3) + '...';
    }
    return result;
  }

  slugify(str: string): string {
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
