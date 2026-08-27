import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ItemResponse } from "@core/interfaces/item-response";
import { AppMessage, IAppMessage } from "@core/models/app-message";
import { AlertService } from "@core/services/alert.service";
import { environment } from "@env/environment";

@Injectable({ providedIn: "root" })
export class FlashService {
    private http = inject(HttpClient);
    private alert = inject(AlertService);

    /**
     * Checks for a pending flash cookie set by the backend and, if present, surfaces it via `AlertService`.
     */
    public check(): void {
        this.http.get<ItemResponse<IAppMessage | null>>(`${environment.apiUrl}/api/flash`).subscribe({
            next: (res) => {
                if (res.data) {
                    this.alert.push(AppMessage.fromJSON(res.data) as AppMessage);
                }
            },
            error: () => { /* no flash to surface, or backend unreachable */ }
        });
    }
}
