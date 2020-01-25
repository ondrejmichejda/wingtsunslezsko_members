import {StructArtikl, StructEvent, StructWtLog} from './DatabaseStruct';

export class DatabaseDataWtlog {

    public Data: Array<StructWtLog> = new Array<StructWtLog>();

    public AddData(id: number, date: Date, text: string) {
        const newData: StructWtLog = new StructWtLog();
        newData.Id = id;
        newData.Date = date;
        newData.Text = text;

        this.Data.push(newData);
    }
}

export class DatabaseDataEvents {

    public Data: Array<StructEvent> = new Array<StructEvent>();

    public AddData(id: number,
                   name: string,
                   school: number,
                   location: string,
                   prize: string,
                   description: string,
                   memberlimit: number,
                   memberlimitMin: number,
                   members: number,
                   notconfirmed: number,
                   datetime: Date,
                   datetimeDeadline: Date,
                   datetimeEnd: Date) {
        const newData: StructEvent = new StructEvent();

        newData.Id = id;
        newData.Name = name;
        newData.School = school;
        newData.Location = location;
        newData.Prize = prize;
        newData.Description = description;
        newData.Memberlimit = memberlimit;
        newData.MemberlimitMin = memberlimitMin;
        newData.Members = members;
        newData.Notconfirmed = notconfirmed;
        newData.Datetime = datetime;
        newData.DatetimeDeadline = datetimeDeadline;
        newData.DatetimeEnd = datetimeEnd;

        this.Data.push(newData);
    }
}

export class DatabaseDataArtikls {

    public Data: Array<StructArtikl> = new Array<StructArtikl>();

    public AddData(id: number,
                   name: string,
                   description: string,
                   memberlimit: number,
                   memberlimitMin: number,
                   members: number,
                   notconfirmed: number,
                   datetimeDeadline: Date,
                   hide: boolean) {
        const newData: StructArtikl = new StructArtikl();

        newData.Id = id;
        newData.Name = name;
        newData.Description = description;
        newData.Memberlimit = memberlimit;
        newData.MemberlimitMin = memberlimitMin;
        newData.Members = members;
        newData.Notconfirmed = notconfirmed;
        newData.DatetimeDeadline = datetimeDeadline;
        newData.Hide = hide;

        this.Data.push(newData);
    }
}


