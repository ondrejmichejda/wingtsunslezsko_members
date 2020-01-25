class DataBaseStruct {
    Id: number;
}

export class StructWtLog extends DataBaseStruct {
    Date: Date;
    Text: string;
}

export class StructEvent extends DataBaseStruct {
    Name: string;
    School: number;
    Location: string;
    Prize: string;
    Description: string;
    Memberlimit: number;
    MemberlimitMin: number;
    Members: number;
    Notconfirmed: number;
    Datetime: Date;
    DatetimeDeadline: Date;
    DatetimeEnd: Date;
}

export class StructArtikl extends DataBaseStruct {
    Name: string;
    Description: string;
    Memberlimit: number;
    MemberlimitMin: number;
    Members: number;
    Notconfirmed: number;
    DatetimeDeadline: Date;
    Hide: boolean;
}
