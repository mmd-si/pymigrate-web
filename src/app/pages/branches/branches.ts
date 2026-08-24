import { Component, signal } from "@angular/core";
import { BranchCard } from "@components/branch-card/branch-card";
import { Branch } from "@core/interface/branch";

@Component({
    imports: [BranchCard],
    selector: "app-branches",
    templateUrl: "./branches.html",
})
export class Branches {
    public branches = signal<Branch[]>([]);
}
