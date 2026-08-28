import { Injectable, signal } from "@angular/core";

interface HeaderButton {
    name: string;
    type: "primary" | "secondary"
    text: string;
    action: (event?: PointerEvent) => void;
    disabled: boolean;
}

@Injectable({ providedIn: "root" })
export class HeaderActionsService {
    private _buttons = signal<HeaderButton[]>([]);

    public readonly buttons = this._buttons.asReadonly();

    public addButton(name: string, type: "primary" | "secondary", text: string, action: (event?: PointerEvent) => void) {
        this._buttons.update(b => [...b, { name, type, text, action, disabled: false }]);
    }

    public removeButton(buttonName: string) {
        this._buttons.update(b => b.filter(x => x.name !== buttonName));
    }

    public setButtonDisabled(buttonName: string, disabled: boolean) {
        this._buttons.update(b => b.map(x => x.name === buttonName ? { ...x, disabled } : x));
    }
}