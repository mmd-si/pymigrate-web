import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { FlashService } from "@core/services/flash.service";
import { finalize } from "rxjs";

export const flashInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.includes("/api/flash")) {
        return next(req);
    }

    const flash = inject(FlashService);
    return next(req).pipe(finalize(() => flash.check()));
};
