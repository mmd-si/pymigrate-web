import { Routes } from "@angular/router";
import { Login } from "./pages/login/login";
import { Branches } from "./pages/branches/branches";
import { Inventory } from "./pages/inventory/inventory";
import { Panel } from "./layouts/panel/panel";
import { Transfers } from "./pages/transfers/transfers";
import { TransferDetails } from "./pages/transfer-details/transfer-details";
import { NotFound } from "@pages/not-found/not-found";
import { authGuard } from "@core/guards/auth.guard";
import { landingGuard } from "@core/guards/landing.guard";

export const routes: Routes = [
    {
        path: "auth/login",
        component: Login
    },
    {
        path: "",
        component: Panel,
        canActivate: [authGuard],
        children: [
            {
                path: "",
                canActivate: [landingGuard],
                children: []
            },
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
            },
            { 
                path: "**", 
                component: NotFound,
                data: { title: "Error 404" }
            }
        ]
    }
];
