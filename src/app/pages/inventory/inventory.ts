import { Component, model, signal } from "@angular/core";
import { ItemDetails } from "@components/item-details/item-details";
import { formatDate, toDateObject, toMoney } from "@core/utils";
import { LucideCheck, LucideSearch, LucideX } from "@lucide/angular";

@Component({
    imports: [LucideSearch, LucideX, LucideCheck, ItemDetails],
    selector: "app-inventory",
    templateUrl: "./inventory.html",
})
export class Inventory {
    public search = model("");
    public inventory = signal([{ 
        barcode: "1234567", 
        entryDate: new Date(), 
        description: "Lorem ipsum dolor sit amet", 
        carats: "18K", 
        cost: 12.32, 
        price: 20.99, 
        weight: 10 
    }]);

    public toDateObject(date: string | number | Date): Date {
        return toDateObject(date);
    }

    public formatDate(date: Date): string {
        return formatDate(date);
    }

    public toMoney(money: number): string {
        return toMoney(money);
    }
}
