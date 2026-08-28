import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { JobStatus } from "@core/enums/job-status.enum";
import { JobSummary } from "@core/models/job-summary";
import { LucideCircleAlert } from "@lucide/angular";

@Component({
    imports: [LucideCircleAlert, RouterLink],
    selector: "app-transfer-card",
    templateUrl: "./transfer-card.html",
})
export class TransferCard {
    summary = input.required<JobSummary>();

    protected readonly JobStatus = JobStatus;
}
