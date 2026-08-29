import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Header } from "@components/header/header";
import { Sidebar } from "@components/sidebar/sidebar";
import { filter, map, startWith } from "rxjs";

@Component({
    imports: [Sidebar, Header, RouterOutlet],
    selector: "app-panel",
    templateUrl: "./panel.html",
})
export class Panel {
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    public pageTitle = toSignal(
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            map(() => {
                let r = this.route.firstChild;
                while (r?.firstChild) r = r.firstChild;
                return r?.snapshot.data["title"] ?? "";
            }),
            startWith("")
        )
    );
}
