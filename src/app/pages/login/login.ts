import { Component, inject, model, signal } from "@angular/core";
import { Logo } from "@components/logo/logo";
import { AlertService } from "@core/services/alert.service";
import { AuthService } from "@core/services/auth.service";
import { LucideCheck } from "@lucide/angular";

@Component({
    imports: [LucideCheck, Logo],
    selector: "app-login",
    templateUrl: "./login.html",
})
export class Login {
    public authService = inject(AuthService);
    public alertService = inject(AlertService);

    public showPassword = signal(false);

    public username = model("");
    public password = model("");
    public rememberMe = model(false);

    public toggleShowPassword() {
        this.showPassword.set(!this.showPassword());
    }

    public login() {
        if (!this.username() || !this.password()) {
            return this.alertService.warning("Por favor introduzca su usuario y clave antes de continuar.");
        }

        this.authService.login(this.username(), this.password(), this.rememberMe()).subscribe();
    }
}
