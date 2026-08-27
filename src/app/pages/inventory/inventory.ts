import { Component, input, model, signal } from "@angular/core";
import { ItemDetails } from "@components/item-details/item-details";
import { InventoryItem } from "@core/models/inventory-item";
import { formatDateShort, toDateObject, commaSeparated } from "@core/utils";
import { LucideCheck, LucideSearch, LucideX } from "@lucide/angular";

@Component({
    imports: [LucideSearch, LucideX, LucideCheck, ItemDetails],
    selector: "app-inventory",
    templateUrl: "./inventory.html",
})
export class Inventory {
    public id = input.required<string>();
    public search = model("");

    public inventory = signal<InventoryItem[]>([]);


    public toDateObject(date: string | number | Date): Date {
        return toDateObject(date);
    }

    public formatDate(date: Date): string {
        return formatDateShort(date);
    }

    public toMoney(money: number): string {
        return commaSeparated(money);
    }
}
