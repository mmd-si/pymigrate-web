import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credentialsInterceptor } from '@core/interceptors/credentials';
import { flashInterceptor } from '@core/interceptors/flash';
import { AuthService } from '@core/services/auth.service';
import { FlashService } from '@core/services/flash.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([credentialsInterceptor, flashInterceptor])),
        provideAppInitializer(() => inject(FlashService).check()),
        provideAppInitializer(() => { inject(AuthService).fetchSession().subscribe({ error: () => {} }); })
    ]
};
