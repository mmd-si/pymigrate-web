import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { map } from "rxjs/operators";

/**
 * Blocks activation unless a session is present, redirecting to the login page otherwise.
 * Re-checks the session on every navigation rather than trusting a possibly stale signal.
 */
export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.fetchSession().pipe(
        map(session => session ? true : router.createUrlTree(["/auth/login"]))
    );
};
