import { formatDateTimeShort } from "@core/utils";
import { JSONModel } from "./json-model";

export interface IDetailedError {
    error_id: string;
    job_id: string;
    item_id: string | null;
    description: string | null;
    message: string;
    occurred_at: Date;
}

export class DetailedError extends JSONModel {
    public id: string;
    public jobId: string;
    public itemId: string | null;
    public description: string | null;
    public message: string;
    public occurredAt: Date;

    private constructor(
        id: string,
        jobId: string,
        itemId: string | null,
        description: string | null,
        message: string,
        occurredAt: Date
    ) {
        super();
        this.id = id;
        this.jobId = jobId;
        this.itemId = itemId;
        this.description = description;
        this.message = message;
        this.occurredAt = occurredAt;
    }

    public static fromJSON(record: IDetailedError): DetailedError {
        if (!("error_id" in record) || !("job_id" in record) || !("message" in record) || !("occurred_at" in record)) {
            throw this.missingRequiredFields();
        }

        const occurredAt = new Date(record.occurred_at);

        if (isNaN(occurredAt.getTime())) {
            throw this.incorrectDateFormat();
        }

        return new DetailedError(
            record.error_id,
            record.job_id,
            record.item_id ?? null,
            record.description ?? null,
            record.message,
            occurredAt
        );
    }

    public hasItemId(): boolean {
        return this.itemId !== null
    }

    public hasDescription(): boolean {
        return this.description !== null
    }

    public ocurredAtDate(): string {
        return formatDateTimeShort(this.occurredAt);
    }
}