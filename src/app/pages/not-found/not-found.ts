import { Component, inject } from "@angular/core";
import { Location } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    imports: [RouterLink],
    selector: "app-not-found",
    templateUrl: "./not-found.html",
})
export class NotFound {
    public location = inject(Location);
}
