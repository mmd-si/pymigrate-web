import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Alert } from '@components/alert/alert';
import { AlertService } from '@core/services/alert.service';

@Component({
    imports: [RouterOutlet, Alert],
    selector: 'app-root',
    templateUrl: './app.html',
})
export class App {
    protected readonly title = signal('pymigrate-web');
    protected alertService = inject(AlertService);
}
