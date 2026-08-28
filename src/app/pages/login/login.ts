import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Logo } from "@components/logo/logo";
import { AlertService } from "@core/services/alert.service";
import { AuthService } from "@core/services/auth.service";
import { LucideCheck } from "@lucide/angular";

@Component({
    imports: [FormsModule, LucideCheck, Logo],
    selector: "app-login",
    templateUrl: "./login.html",
})
export class Login {
    public authService = inject(AuthService);
    public alertService = inject(AlertService);
    private router = inject(Router);

    public showPassword = signal(false);

    public username = signal("");
    public password = signal("");
    public rememberMe = signal(false);

    public toggleShowPassword() {
        this.showPassword.set(!this.showPassword());
    }

    public login() {
        if (!this.username()) {
            return this.alertService.warning("Por favor introduzca su usuario antes de continuar.");
        } if (!this.password()) {
            return this.alertService.warning("Por favor introduzca su clave antes de continuar.");
        }

        this.authService.login(
            this.username(), 
            this.password(), 
            this.rememberMe()
        ).subscribe({
            next: () => {
                this.router.navigate(["/branches"]);
            },
            error: () => { /* the flash interceptor surfaces this via AlertService */ }
        });
    }
}
