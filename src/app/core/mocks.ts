import { ItemResult } from "@core/enums/item-result.enum";
import { JobStatus } from "@core/enums/job-status.enum";
import { Branch } from "@core/models/branch";
import { DetailedError } from "@core/models/detailed-error";
import { DetailedJob } from "@core/models/detailed-job";
import { DetailedJobItem } from "@core/models/detailed-job-item";
import { ErrorSummary } from "@core/models/error-summary";
import { InventoryItem } from "@core/models/inventory-item";
import { JobSummary } from "@core/models/job-summary";
import { Session } from "@core/models/session";

export const mockBranch = Branch.fromJSON({
    id: 1,
    name: "Villa Lucre",
    acronym: "VL",
});

export const mockErrorSummary = ErrorSummary.fromJSON({
    description: "Registro duplicado",
    message: "El artículo ya existe en la sucursal de destino.",
    occurred_at: "2026-08-20T14:32:00Z" as unknown as Date,
});

export const mockJobSummary = JobSummary.fromJSON({
    job_id: "job-0001",
    status: JobStatus.Processing,
    pushed_at: "2026-08-20T14:00:00Z",
    recount: {
        [ItemResult.Pending]: 4,
        [ItemResult.Success]: 12,
        [ItemResult.Failure]: 1,
    },
    latest_error: {
        description: "Registro duplicado",
        message: "El artículo ya existe en la sucursal de destino.",
        occurred_at: "2026-08-20T14:32:00Z" as unknown as Date,
    },
});

export const mockDetailedError = DetailedError.fromJSON({
    error_id: "err-0001",
    job_id: "job-0001",
    item_id: "item-0001",
    description: "Registro duplicado",
    message: "El artículo ya existe en la sucursal de destino.",
    occurred_at: "2026-08-20T14:32:00Z" as unknown as Date,
});

export const mockDetailedJobItem = DetailedJobItem.fromJSON({
    item_id: "item-0001",
    barcode: "7501234567890",
    item_name: "Anillo de oro 14k",
    category: "Joyería",
    result: ItemResult.Success,
});

export const mockDetailedJob = DetailedJob.fromJSON({
    job_id: "job-0001",
    status: JobStatus.Processing,
    pushed_at: "2026-08-20T14:00:00Z",
    shifted_at: "2026-08-20T14:05:00Z",
    completed_at: null,
    recount: {
        [ItemResult.Pending]: 4,
        [ItemResult.Success]: 12,
        [ItemResult.Failure]: 1,
    },
    items: [
        {
            item_id: "item-0001",
            barcode: "7501234567890",
            item_name: "Anillo de oro 14k",
            category: "Joyería",
            result: ItemResult.Success,
        },
        {
            item_id: "item-0002",
            barcode: "7501234567891",
            item_name: "Cadena de plata",
            category: "Joyería",
            result: ItemResult.Pending,
        },
    ],
    errors: [
        {
            error_id: "err-0001",
            job_id: "job-0001",
            item_id: "item-0001",
            description: "Registro duplicado",
            message: "El artículo ya existe en la sucursal de destino.",
            occurred_at: "2026-08-20T14:32:00Z" as unknown as Date,
        },
    ],
});

export const mockInventoryItem = InventoryItem.fromJSON({
    internal_ref: "INV-0001",
    barcode: "7501234567890",
    description: "Anillo de oro 14k con diamante",
    uom: "unidad",
    purchase_uom: "unidad",
    weight: 5.4,
    carat_rating: "14k",
    can_be_sold: true,
    can_be_bought: true,
    product_type: "joyería",
    provider_tax: "ITBMS",
    customer_tax: "ITBMS",
    tags: "oro, anillo, diamante",
    retail_price: 450.0,
    cost: 275.5,
    observations: "En buen estado",
    pawn_no: "P-0001",
    pawn_type: "empeño",
    stone_weight: 0.25,
    brand: null,
    model: null,
    series: null,
    name: "Anillo de oro 14k",
    product_category: "Joyería",
    branch: "casa central",
});

export const mockSession = Session.fromJSON({
    user_id: "user-0001",
    first_name: "Diego",
    last_name: "Chan",
    branch_id: 1,
    role_id: 1,
    ip_address: "127.0.0.1",
    user_agent: "Mozilla/5.0",
    data: {},
});
