import { httpResource } from "@angular/common/http";
import { Component, signal } from "@angular/core";
import { TransferCard } from "@components/transfer-card/transfer-card";
import { APIResponse } from "@core/classes/api-response";
import { JobStatus } from "@core/enums/job-status.enum";
import { ListResponse } from "@core/interfaces/list-response";
import { IJobSummary, JobSummary } from "@core/models/job-summary";
import { capitalize } from "@core/utils";
import { environment } from "@env/environment";
import { LucideFaceSlightlyFrowning, LucideLoaderCircle } from "@lucide/angular";

@Component({
    imports: [TransferCard, LucideLoaderCircle, LucideFaceSlightlyFrowning],
    selector: "app-transfers",
    templateUrl: "./transfers.html",
})
export class Transfers {
    public status = signal<string>("All");

    transfers = httpResource<JobSummary[]>(() => {
        const status = this.status();
        const url = `${environment.apiUrl}/api/v1/transfers/`;
        return status === "All" ? url : `${url}?status=${status}`;
    }, {
        parse: (body: unknown) => APIResponse.listUnpack(JobSummary, body as ListResponse<IJobSummary>),
        defaultValue: []
    });

    public jobStatusMembers = Object.entries(JobStatus);

    public capitalize(text: string): string {
        return capitalize(text);
    }
}
