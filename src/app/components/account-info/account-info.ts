import { Component, inject, input } from "@angular/core";
import { Router } from "@angular/router";
import { Session } from "@core/models/session";
import { AuthService } from "@core/services/auth.service";
import { LucideLogOut } from "@lucide/angular";

@Component({
    imports: [LucideLogOut],
    selector: "app-account-info",
    templateUrl: "./account-info.html",
})
export class AccountInfo {
    public session = input.required<Session>();

    private router = inject(Router);
    public authService = inject(AuthService);

    public logout() {
        if (!confirm("Desea cerrar su sesión?")) return;
        this.authService.logout().subscribe((_) => {
            this.router.navigate(["/auth/login"])
        });
    }
}
