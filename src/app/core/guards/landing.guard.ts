import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

/**
 * Sends "/" to the panel if a session is present, or to login otherwise, instead of
 * always redirecting to the panel regardless of auth state.
 */
export const landingGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.fetchSession().pipe(
        map(session => router.createUrlTree([session ? "/branches" : "/auth/login"])),
        catchError(() => of(router.createUrlTree(["/auth/login"])))
    );
};
