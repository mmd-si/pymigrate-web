import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ItemResponse } from "@core/interfaces/item-response";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class TransferService {
    private http = inject(HttpClient);

    /**
     * Submits the selected barcodes to be transferred to Odoo as a new job.
     */
    public create(rowIds: string[]): Observable<string> {
        return this.http
            .post<ItemResponse<string>>(`${environment.apiUrl}/api/v1/transfers/`, { rowIds })
            .pipe(map(res => res.data));
    }
}
