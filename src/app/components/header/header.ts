import { Component, input } from "@angular/core";

@Component({
    imports: [],
    selector: "app-header",
    templateUrl: "./header.html",
})
export class Header {
    public pageTitle = input("");
}
