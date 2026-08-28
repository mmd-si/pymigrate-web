import { Component, input, output } from "@angular/core";
import { InventoryItem } from "@core/models/inventory-item";

@Component({
    selector: "app-transfer-confirm",
    imports: [],
    templateUrl: "./transfer-confirm.html",
})
export class TransferConfirm {
    public items = input.required<InventoryItem[]>();

    public cancel = output<void>();
    public confirm = output<void>();
}
