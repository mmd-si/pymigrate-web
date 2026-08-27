import { httpResource } from "@angular/common/http";
import { Component } from "@angular/core";
import { TransferCard } from "@components/transfer-card/transfer-card";
import { APIResponse } from "@core/classes/api-response";
import { ListResponse } from "@core/interfaces/list-response";
import { IJobSummary, JobSummary } from "@core/models/job-summary";
import { mockJobSummary } from "@core/mocks";
import { environment } from "@env/environment";
import { LucideLoaderCircle } from "@lucide/angular";

@Component({
    imports: [TransferCard, LucideLoaderCircle],
    selector: "app-transfers",
    templateUrl: "./transfers.html",
})
export class Transfers {
    transfers = httpResource<JobSummary[]>(() => `${environment.apiUrl}/api/v1/transfers`, {
        parse: (body: unknown) => APIResponse.listUnpack(JobSummary, body as ListResponse<IJobSummary>),
        defaultValue: [mockJobSummary]
    });
}
