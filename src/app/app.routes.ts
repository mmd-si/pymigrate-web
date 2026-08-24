import { Routes } from "@angular/router";
import { Login } from "./pages/login/login";
import { Branches } from "./pages/branches/branches";
import { Inventory } from "./pages/inventory/inventory";
import { Panel } from "./layouts/panel/panel";
import { Transfers } from "./pages/transfers/transfers";
import { TransferDetails } from "./pages/transfer-details/transfer-details";

export const routes: Routes = [
    {
        path: "auth/login",
        component: Login
    },
    {
        path: "",
        component: Panel,
        children: [
            {
                path: "branches",
                component: Branches ,
                data: { title: "Sucursales" }
            },
            {
                path: "branches/:id",
                component: Inventory,
                data: { title: "Inventario" }
            },
            {
                path: "transfers",
                component: Transfers,
                data: { title: "Mis transferencias" }
            },
            {
                path: "transfers/:id",
                component: TransferDetails,
                data: { title: "Detalle de transferencia" }
            }
        ]
    }
];
