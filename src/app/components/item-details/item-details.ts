import { Component, input, output } from "@angular/core";
import { InventoryItem } from "@core/models/inventory-item";
import { LucideMinus, LucidePlus, LucideX } from "@lucide/angular";

@Component({
    imports: [LucideX, LucidePlus, LucideMinus],
    selector: "app-item-details",
    templateUrl: "./item-details.html",
})
export class ItemDetails {
    public item = input.required<InventoryItem>();
    public selected = input(false);

    public close = output<void>();
    public toggleSelection = output<void>();
}
