import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ReportService {
    private http = inject(HttpClient);

    /**
     * Fetches the transfer invoice PDF as a blob.
     */
    public getInvoicePdf(transferId: string): Observable<Blob> {
        return this.http.get(`${environment.apiUrl}/api/v1/transfers/${transferId}/pdf`, {
            responseType: "blob"
        });
    }
}
