import { Component, signal } from "@angular/core";
import { Logo } from "@components/logo/logo";
import { LucideCheck } from "@lucide/angular";

@Component({
    imports: [LucideCheck, Logo],
    selector: "app-login",
    templateUrl: "./login.html",
})
export class Login {
    public showPassword = signal(false);

    public toggleShowPassword() {
        this.showPassword.set(!this.showPassword());
    }
}
