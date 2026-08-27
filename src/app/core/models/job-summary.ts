import { ItemResult } from "@core/enums/item-result.enum";
import { JobStatus } from "@core/enums/job-status.enum";
import { ErrorSummary, IErrorSummary } from "./error-summary";
import { JSONModel } from "./json-model";
import { formatDateTimeLong } from "@core/utils";

export interface IJobSummary {
    job_id: string;
    status: JobStatus;
    pushed_at: string;
    recount: Record<ItemResult, number>;
    latest_error: IErrorSummary | null;
}

export class JobSummary extends JSONModel {
    public id: string;
    public status: JobStatus;
    public pushedAt: Date;
    public recount: Record<ItemResult, number> = {
        [ItemResult.Pending]: 0,
        [ItemResult.Success]: 0,
        [ItemResult.Failure]: 0
    };
    public latestError: ErrorSummary | null;

    private constructor(
        id: string,
        status: JobStatus,
        pushedAt: Date,
        recount: Record<ItemResult, number> | null,
        latestError: ErrorSummary | null
    ) {
        super();
        this.id = id;
        this.status = status;
        this.pushedAt = pushedAt;
        if (recount) this.recount = recount;
        this.latestError = latestError;
    }

    public static fromJSON(record: IJobSummary): JobSummary {
        if (!("job_id" in record) || !("status" in record) || !("pushed_at" in record)) {
            throw this.missingRequiredFields();
        }

        const pushedAt = new Date(record.pushed_at);

        if (isNaN(pushedAt.getTime())) {
            throw this.incorrectDateFormat();
        }

        if (!Object.values(JobStatus).includes(record.status as JobStatus)) {
            throw this.isNotMember(record.status, "JobStatus");
        }

        const latestError = record.latest_error ? ErrorSummary.fromJSON(record.latest_error) : null;

        return new JobSummary(record.job_id, record.status, pushedAt, record.recount ?? null, latestError);
    }

    public hasError(): boolean {
        return this.latestError !== null;
    }

    public pushDate(): string {
        return formatDateTimeLong(this.pushedAt);
    }

    public pendingCount(): number {
        return this.recount[ItemResult.Pending];
    }

    public successCount(): number {
        return this.recount[ItemResult.Success];
    }

    public failureCount(): number {
        return this.recount[ItemResult.Failure];
    }

    public totalRecount(): number {
        return Object.values(this.recount).reduce((acc, count) => acc + count, 0);
    }
}