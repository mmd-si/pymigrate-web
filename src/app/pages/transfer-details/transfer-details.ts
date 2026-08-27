import { httpResource } from "@angular/common/http";
import { Component, input } from "@angular/core";
import { APIResponse } from "@core/classes/api-response";
import { ItemResponse } from "@core/interfaces/item-response";
import { DetailedJob, IDetailedJob } from "@core/models/detailed-job";
import { mockDetailedJob } from "@core/mocks";
import { environment } from "@env/environment";

@Component({
    imports: [],
    selector: "app-transfer-details",
    templateUrl: "./transfer-details.html",
})
export class TransferDetails {
    public id = input.required<string>();

    transfer = httpResource<DetailedJob>(() => `${environment.apiUrl}/api/v1/transfers/${this.id}`, {
        parse: (body: unknown) => APIResponse.itemUnpack(DetailedJob, body as ItemResponse<IDetailedJob>),
        defaultValue: mockDetailedJob
    });
}
