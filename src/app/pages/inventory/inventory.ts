import { HttpErrorResponse, httpResource } from "@angular/common/http";
import { Component, computed, effect, inject, input, signal } from "@angular/core";
import { InvRow } from "@components/inv-row/inv-row";
import { ItemDetails } from "@components/item-details/item-details";
import { TransferConfirm } from "@components/transfer-confirm/transfer-confirm";
import { APIResponse } from "@core/classes/api-response";
import { ItemResponse } from "@core/interfaces/item-response";
import { Branch, IBranch } from "@core/models/branch";
import { IInventoryItem, InventoryItem } from "@core/models/inventory-item";
import { AlertService } from "@core/services/alert.service";
import { LocalStorageService } from "@core/services/local-storage.service";
import { TransferService } from "@core/services/transfer.service";
import { environment } from "@env/environment";
import { LucideLoaderCircle, LucideRefreshCw, LucideSearch, LucideX } from "@lucide/angular";

type DialogType = "details" | "confirmation";

@Component({
    imports: [LucideSearch, LucideX, LucideRefreshCw, LucideLoaderCircle, ItemDetails, TransferConfirm, InvRow],
    selector: "app-inventory",
    templateUrl: "./inventory.html",
})
export class Inventory {
    public HttpErrorResponse = HttpErrorResponse;

    public id = input.required<string>();

    public search = signal("");

    private alertService = inject(AlertService);
    private storageService = inject(LocalStorageService);
    private transferService = inject(TransferService);

    public branch = httpResource<Branch>(() => `${environment.apiUrl}/api/v1/branches/${this.id()}`, {
        parse: (body: unknown) => APIResponse.itemUnpack(Branch, body as ItemResponse<IBranch>)
    })

    public query = signal("");
    public reloading = signal(false);
    private shouldAutoclear = false;

    public selection = signal(new Map<string, InventoryItem>());
    public selectedList = computed(() => [...this.selection().values()]);

    public activeDialog = signal<DialogType | null>(null);
    public detailsItem = signal<InventoryItem | null>(null);
    public detailsDialogItem = computed(() => this.activeDialog() === "details" ? this.detailsItem() : null);

    public response = httpResource<InventoryItem>(() => {
        if (!this.query().trim()) return undefined;
        return `${environment.apiUrl}/api/v1/branches/${this.id()}/inventory/${this.query().trim()}`;
    }, {
        parse: (body: unknown) => APIResponse.itemUnpack(InventoryItem, body as ItemResponse<IInventoryItem>),
    });

    private autoAdd = effect(() => {
        if (!this.response.hasValue()) return;

        const item = this.response.value();
        if (!this.selection().has(item.barcode!)) {
            this.selection.update(m => new Map(m).set(item.barcode!, item));
        }
    });

    public onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.search.set(input.value);
    }

    public onKeyDown(event: KeyboardEvent): void {
        const input = event.target as HTMLInputElement;

        if (event.key === "Enter") {
            event.preventDefault();
            this.query.set(input.value.trim());
            this.shouldAutoclear = true;
            return;
        }

        if (this.shouldAutoclear && event.key.length === 1) {
            this.shouldAutoclear = false;
            this.search.set(event.key);
            event.preventDefault();
            input.value = event.key;
        }
    }

    public reload(): void {
        this.reloading.set(true);
        this.query.set(this.search().trim());
        this.response.reload();
        setTimeout(() => this.reloading.set(false), 500);
    }

    public isSelected(item: InventoryItem): boolean {
        return this.selection().has(item.barcode!);
    }

    public toggle(item: InventoryItem): void {
        this.selection.update(m => {
            const next = new Map(m);
            if (next.has(item.barcode!)) {
                next.delete(item.barcode!);
            } else {
                next.set(item.barcode!, item);
            }
            return next;
        });
    }

    public showDetails(item: InventoryItem): void {
        this.detailsItem.set(item);
        this.activeDialog.set("details");
    }

    public showConfirmation(): void {
        this.activeDialog.set("confirmation");
    }

    public closeDialog(): void {
        this.activeDialog.set(null);
    }

    public toggleAndClose(item: InventoryItem): void {
        this.toggle(item);
        this.closeDialog();
    }

    public submitTransfer(): void {
        const barcodes = this.selectedList().map(item => item.barcode!);

        this.transferService.create(barcodes).subscribe({
            next: () => {
                this.selection.set(new Map());
                this.closeDialog();
                this.alertService.success("Transferencia registrada exitosamente!");
                this.storageService.set("tries", 0);
            },
            error: (error: HttpErrorResponse) => {
                const tries = this.storageService.get("tries");
                let tryCount = tries.isNull() ? 0 : tries.toInt();

                if (tryCount < 2) {
                    this.alertService.error(error.error?.detail ?? "Hubo un error desconocido.");
                    this.storageService.set("tries", ++tryCount);
                } else {
                    this.alertService.error("Algo parece andar mal. Inténtelo más tarde.");
                    this.storageService.set("tries", 0);
                }
            }
        });
    }
}
