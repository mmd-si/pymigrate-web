import { Component, input } from "@angular/core";
import { InventoryItem } from "@core/models/inventory-item";
import { LucideX } from "@lucide/angular";

@Component({
    imports: [LucideX],
    selector: "app-item-details",
    templateUrl: "./item-details.html",
})
export class ItemDetails {
    item = input.required<InventoryItem>();
}
