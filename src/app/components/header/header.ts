import { Component, inject, input } from "@angular/core";
import { HeaderActionsService } from "@core/services/header-actions.service";

@Component({
    imports: [],
    selector: "app-header",
    templateUrl: "./header.html",
})
export class Header {
    public actionsService = inject(HeaderActionsService);
    public pageTitle = input("");
}
