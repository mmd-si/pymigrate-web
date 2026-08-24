import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AccountInfo } from "@components/account-info/account-info";
import { Logo } from "@components/logo/logo";

@Component({
    imports: [Logo, AccountInfo, RouterLink, RouterLinkActive],
    selector: "app-sidebar",
    templateUrl: "./sidebar.html",
})
export class Sidebar {}
