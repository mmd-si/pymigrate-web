import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AccountInfo } from "@components/account-info/account-info";
import { Logo } from "@components/logo/logo";
import { AuthService } from "@core/services/auth.service";

@Component({
    imports: [Logo, AccountInfo, RouterLink, RouterLinkActive],
    selector: "app-sidebar",
    templateUrl: "./sidebar.html",
})
export class Sidebar {
    protected authService = inject(AuthService);
}
