export class Convert{
  public static sqlToJsDate(sqlDate: string){
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
}


