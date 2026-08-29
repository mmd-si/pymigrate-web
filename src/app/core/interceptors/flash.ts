import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AlertService } from "@core/services/alert.service";
import { FlashService } from "@core/services/flash.service";
import { catchError, finalize, throwError } from "rxjs";

const CONNECTION_ERROR_MESSAGE = "No se pudo conectar con el servidor. Verifique su conexión e inténtelo nuevamente.";
const CONNECTION_ALERT_COOLDOWN_MS = 5000;

let lastConnectionAlertAt = 0;

export const flashInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.includes("/api/flash")) {
        return next(req);
    }

    const flash = inject(FlashService);
    const alert = inject(AlertService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            // status 0 means the request never reached a server (connection refused, DNS
            // failure, offline, etc.) — the browser has no equivalent to a Node ECONNREFUSED.
            const now = Date.now();
            if (error.status === 0 && now - lastConnectionAlertAt > CONNECTION_ALERT_COOLDOWN_MS) {
                lastConnectionAlertAt = now;
                alert.error(CONNECTION_ERROR_MESSAGE);
            }
            return throwError(() => error);
        }),
        finalize(() => flash.check())
    );
};
