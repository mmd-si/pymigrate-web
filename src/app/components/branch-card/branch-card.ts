import { Component, input } from "@angular/core";
import { Branch } from "@core/models/branch";

@Component({
    imports: [],
    selector: "app-branch-card",
    templateUrl: "./branch-card.html",
})
export class BranchCard {
    branch = input.required<Branch>();
}
