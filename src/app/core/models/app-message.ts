import { MessageType } from "@core/enums/message-type.enum";
import { JSONModel } from "./json-model";

export interface IAppMessage {
    type: MessageType;
    message: string;
}

export class AppMessage extends JSONModel {
    public type: MessageType;
    public message: string;


    constructor(type: MessageType, message: string) {
        super();
        this.type = type;
        this.message = message;
    }

    public static fromJSON(record: IAppMessage): JSONModel {
        if (!("type" in record) || !("message" in record)) {
            throw this.missingRequiredFields();
        }

        if (!Object.values(MessageType).includes(record.type as MessageType)) {
            throw this.isNotMember(record.type, "MessageType");
        }

        return new AppMessage(record.type, record.message);
    }

}