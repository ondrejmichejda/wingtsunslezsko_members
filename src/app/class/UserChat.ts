export class UserChat {
    public Data: Array<MsgStruct> = new Array<MsgStruct>();

    public AddMsg(me: boolean, date: Date, text: string): void {
        const Msg = new MsgStruct();

        Msg.Me = me;
        Msg.Date = date;
        Msg.Text = text;

        this.Data.push(Msg);
    }
}

class MsgStruct {
    public Me: boolean;
    public Date: Date;
    public Text: string;
}
