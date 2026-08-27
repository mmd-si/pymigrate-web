import { Component, input } from "@angular/core";
import { JobSummary } from "@core/models/job-summary";
import { LucideCircleAlert } from "@lucide/angular";

@Component({
    imports: [LucideCircleAlert],
    selector: "app-transfer-card",
    templateUrl: "./transfer-card.html",
})
export class TransferCard {
    summary = input.required<JobSummary>();
}
