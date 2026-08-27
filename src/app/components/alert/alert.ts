import { Component, effect, input, model } from "@angular/core";
import { AppMessage } from "@core/models/app-message";
import { LucideCircleAlert, LucideCheck, LucideInfo, LucideTriangleAlert, LucideX } from "@lucide/angular";

@Component({
    imports: [LucideCheck, LucideCircleAlert, LucideInfo, LucideTriangleAlert, LucideX],
    selector: "app-alert",
    templateUrl: "./alert.html",
})
export class Alert {
    public visible = model(false);
    public alert = input<AppMessage>();

    constructor() {
        effect(() => {
            if (this.visible()) {
                setTimeout(() => {
                    this.visible.set(false);
                }, 5000);
            }
        });
    }

    public dismiss() {
        this.visible.set(false);
    }
}
