import { Component } from "@angular/core";
import { TransferCard } from "@components/transfer-card/transfer-card";

@Component({
    imports: [TransferCard],
    selector: "app-transfers",
    templateUrl: "./transfers.html",
})
export class Transfers {}
