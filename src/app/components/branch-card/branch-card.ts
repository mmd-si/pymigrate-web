import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Branch } from "@core/models/branch";

@Component({
    imports: [RouterLink],
    selector: "app-branch-card",
    templateUrl: "./branch-card.html",
})
export class BranchCard {
    branch = input.required<Branch>();
}
