import { Component, input } from "@angular/core";
import { LucideX } from "@lucide/angular";

@Component({
    imports: [LucideX],
    selector: "app-item-details",
    templateUrl: "./item-details.html",
})
export class ItemDetails {
    item = input();
}
