import { Injectable, effect, signal } from "@angular/core";
import { MessageType } from "@core/enums/message-type.enum";
import { AppMessage } from "@core/models/app-message";

@Injectable({ providedIn: "root" })
export class AlertService {
    private queue: AppMessage[] = [];

    public current = signal<AppMessage | undefined>(undefined);
    public visible = signal(false);

    /**
     * Advances to the next queued message whenever the currently visible one is dismissed.
     */
    constructor() {
        effect(() => {
            if (!this.visible() && this.queue.length) {
                this.showNext();
            }
        });
    }

    /**
     * Queues a message, showing it immediately if nothing is currently visible.
     */
    public push(message: AppMessage): void {
        this.queue.push(message);
        if (!this.visible()) {
            this.showNext();
        }
    }

    /**
     * Queues a success alert.
     */
    public success(message: string): void {
        this.push(new AppMessage(MessageType.Success, message));
    }

    /**
     * Queues an info alert.
     */
    public info(message: string): void {
        this.push(new AppMessage(MessageType.Info, message));
    }

    /**
     * Queues a warning alert.
     */
    public warning(message: string): void {
        this.push(new AppMessage(MessageType.Warning, message));
    }

    /**
     * Queues an error alert.
     */
    public error(message: string): void {
        this.push(new AppMessage(MessageType.Error, message));
    }

    /**
     * Pops the next queued message and displays it.
     */
    private showNext(): void {
        this.current.set(this.queue.shift());
        this.visible.set(true);
    }
}
