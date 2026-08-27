import { httpResource } from "@angular/common/http";
import { Component, signal } from "@angular/core";
import { BranchCard } from "@components/branch-card/branch-card";
import { APIResponse } from "@core/classes/api-response";
import { ListResponse } from "@core/interfaces/list-response";
import { Branch, IBranch } from "@core/models/branch";
import { mockBranch } from "@core/mocks";
import { environment } from "@env/environment";
import { LucideLoaderCircle } from "@lucide/angular";

@Component({
    imports: [BranchCard, LucideLoaderCircle],
    selector: "app-branches",
    templateUrl: "./branches.html",
})
export class Branches {
    public branches = httpResource<Branch[]>(() => `${environment.apiUrl}/api/v1/branches`, {
        parse: (body: unknown) => APIResponse.listUnpack(Branch, body as ListResponse<IBranch>),
        defaultValue: [mockBranch]
    });
}
