import { ItemResult } from "@core/enums/item-result.enum";
import { JobStatus } from "@core/enums/job-status.enum";
import { DetailedJobItem, IDetailedJobItem } from "./detailed-job-item";
import { DetailedError, IDetailedError } from "./detailed-error";
import { JSONModel } from "./json-model";
import { formatDateTimeLong, formatDateTimeShort } from "@core/utils";

export interface IDetailedJob {
    job_id: string;
    status: JobStatus;
    pushed_at: string;
    shifted_at: string | null;
    completed_at: string | null;
    recount: Record<ItemResult, number>;
    items: IDetailedJobItem[];
    errors: IDetailedError[];
}
export class DetailedJob extends JSONModel {
    public id: string;
    public status: JobStatus;
    public pushedAt: Date;
    public shiftedAt: Date | null;
    public completedAt: Date | null;
    public recount: Record<ItemResult, number> = {
        [ItemResult.Pending]: 0,
        [ItemResult.Success]: 0,
        [ItemResult.Failure]: 0
    };
    public items: DetailedJobItem[];
    public errors: DetailedError[];

    private constructor(
        id: string,
        status: JobStatus,
        pushedAt: Date,
        shiftedAt: Date | null,
        completedAt: Date | null,
        recount: Record<ItemResult, number> | null = null,
        items: DetailedJobItem[] = [],
        errors: DetailedError[] = []
    ) {
        super();
        this.id = id;
        this.status = status;
        this.pushedAt = pushedAt;
        this.shiftedAt = shiftedAt;
        this.completedAt = completedAt;
        if (recount) this.recount = recount;
        this.items = items;
        this.errors = errors;
    }

    public static fromJSON(record: IDetailedJob): DetailedJob {
        if (!("job_id" in record) || !("status" in record) || !("pushed_at" in record)) {
            throw this.missingRequiredFields();
        }

        const pushedAt = new Date(record.pushed_at);

        if (isNaN(pushedAt.getTime())) {
            throw this.incorrectDateFormat();
        }

        const shiftedAt = record.shifted_at ? new Date(record.shifted_at) : null;

        if (shiftedAt && isNaN(shiftedAt.getTime())) {
            throw this.incorrectDateFormat();
        }

        const completedAt = record.completed_at ? new Date(record.completed_at) : null;

        if (completedAt && isNaN(completedAt.getTime())) {
            throw this.incorrectDateFormat();
        }

        if (!Object.values(JobStatus).includes(record.status as JobStatus)) {
            throw this.isNotMember(record.status, "JobStatus");
        }

        const items = (record.items ?? []).map((item) => DetailedJobItem.fromJSON(item));
        const errors = (record.errors ?? []).map((error) => DetailedError.fromJSON(error));

        return new DetailedJob(
            record.job_id,
            record.status,
            pushedAt,
            shiftedAt,
            completedAt,
            record.recount ?? null,
            items,
            errors
        );
    }

    public isShifted(): boolean {
        return this.shiftedAt !== null;
    }

    public isComplete(): boolean {
        return this.completedAt !== null;
    }

    public itemCount(): number {
        return this.items.length;
    }

    public failureCount(): number {
        return this.recount[ItemResult.Failure]
    }

    public pendingCount(): number {
        return this.recount[ItemResult.Pending]
    }

    public successCount(): number {
        return this.recount[ItemResult.Success]
    }

    public hasItems(): boolean {
        return this.itemCount() !== 0;
    }

    public errorCount(): number {
        return this.errors.length;
    }

    public hasErrors(): boolean {
        return this.errorCount() !== 0;
    }

    public pushedAtDateLong(): string {
        return formatDateTimeLong(this.pushedAt);
    }

    public pushedAtDate(): string {
        return formatDateTimeShort(this.pushedAt);
    }

    public shiftedAtDate(): string | null {
        return this.isShifted() ? formatDateTimeShort(this.shiftedAt!) : null;
    }

    public completedAtDate(): string | null {
        return this.isComplete() ? formatDateTimeShort(this.completedAt!) : null;
    }
}
