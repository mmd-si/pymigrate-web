import { httpResource, HttpErrorResponse } from "@angular/common/http";
import { Component, inject, input } from "@angular/core";
import { APIResponse } from "@core/classes/api-response";
import { ItemResponse } from "@core/interfaces/item-response";
import { DetailedJob, IDetailedJob } from "@core/models/detailed-job";
import { environment } from "@env/environment";
import { ItemResult } from "@core/enums/item-result.enum";
import { LucideCircleAlert, LucideFaceSlightlyFrowning, LucideLoaderCircle } from "@lucide/angular";
import { HeaderActionsService } from "@core/services/header-actions.service";
import { ReportService } from "@core/services/report.service";
import { AlertService } from "@core/services/alert.service";
import { finalize } from "rxjs";

@Component({
    imports: [LucideCircleAlert, LucideLoaderCircle, LucideFaceSlightlyFrowning],
    selector: "app-transfer-details",
    templateUrl: "./transfer-details.html",
})
export class TransferDetails {
    public actionsService = inject(HeaderActionsService);
    private reportService = inject(ReportService);
    private alertService = inject(AlertService);
    public ItemResult = ItemResult;

    public id = input.required<string>();

    transfer = httpResource<DetailedJob>(() => `${environment.apiUrl}/api/v1/transfers/${this.id()}`, {
        parse: (body: unknown) => APIResponse.itemUnpack(DetailedJob, body as ItemResponse<IDetailedJob>),
    });

    private printBtn: string = "printButton";

    public exportToPdf() {
        this.actionsService.setButtonDisabled(this.printBtn, true);
        this.reportService.getInvoicePdf(this.id())
            .pipe(finalize(() => this.actionsService.setButtonDisabled(this.printBtn, false)))
            .subscribe({
                next: blob => {
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                    URL.revokeObjectURL(url);
                },
                error: (error: HttpErrorResponse) => {
                    this.alertService.error(error.error?.detail ?? "Hubo un error al generar el PDF.");
                }
            });
    }

    ngOnInit() {
        this.actionsService.addButton(this.printBtn, "primary", "Imprimir", this.exportToPdf.bind(this));
    }

    ngOnDestroy() {
        this.actionsService.removeButton(this.printBtn);
    }

}
