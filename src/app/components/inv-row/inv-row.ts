import { Component, input, output } from "@angular/core";
import { InventoryItem } from "@core/models/inventory-item";
import { LucideCheck } from "@lucide/angular";

@Component({
    selector: "tr[app-inv-row]",
    imports: [LucideCheck],
    templateUrl: "./inv-row.html",
})
export class InvRow {
    public item = input.required<InventoryItem>();
    public checked = input.required<boolean>();

    public toggle = output<void>();
    public openDetails = output<void>();
}
