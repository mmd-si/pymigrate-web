import { JSONModel } from "./json-model";

export interface IErrorSummary {
    description: string | null;
    message: string;
    occurred_at: Date;
}

export class ErrorSummary extends JSONModel {
    description: string | null;
    message: string;
    occurredAt: Date;

    private constructor(description: string | null, message: string, occurredAt: Date) {
        super();
        this.description = description;
        this.message = message;
        this.occurredAt = occurredAt;
    }

    public static fromJSON(json: string): ErrorSummary {
        return this.fromRecord(JSON.parse(json) as IErrorSummary);
    }

    public static fromRecord(record: IErrorSummary): ErrorSummary {
        if (!("message" in record) || !("occurred_at" in record)) {
            throw this.missingRequiredFields();
        }

        const date = new Date(record.occurred_at);

        if (isNaN(date.getTime())) {
            throw this.incorrectDateFormat();
        }

        return new ErrorSummary(record.description ?? null, record.message, date);
    }

    public hasDescription(): boolean {
        return this.description !== null
    }
}
