import { commaSeparated } from "@core/utils";
import { JSONModel } from "./json-model";

export interface IInventoryItem {
    internal_ref: string | null;
    barcode: string | null;
    description: string | null;
    uom: string | null;
    purchase_uom: string | null;
    weight: number | null;
    carat_rating: string | null;
    can_be_sold: boolean | null;
    can_be_bought: boolean | null;
    product_type: string | null;
    provider_tax: string | null;
    customer_tax: string | null;
    tags: string | null;
    retail_price: number | null;
    cost: number | null;
    observations: string | null;
    pawn_no: string | null;
    pawn_type: string | null;
    stone_weight: number | null;
    brand: string | null;
    model: string | null;
    series: string | null;
    name: string | null;
    product_category: string;
    branch: string;
}

export class InventoryItem extends JSONModel {
    public internalRef: string | null;
    public barcode: string | null;
    public description: string | null;
    public uom: string | null;
    public purchaseUom: string | null;
    public weight: number | null;
    public caratRating: string | null;
    public canBeSold: boolean | null;
    public canBeBought: boolean | null;
    public productType: string | null;
    public providerTax: string | null;
    public customerTax: string | null;
    public tags: string | null;
    public retailPrice: number | null;
    public cost: number | null;
    public observations: string | null;
    public pawnNo: string | null;
    public pawnType: string | null;
    public stoneWeight: number | null;
    public brand: string | null;
    public model: string | null;
    public series: string | null;
    public name: string | null;
    public productCategory: string;
    public branch: string;

    private constructor(
        internalRef: string | null,
        barcode: string | null,
        description: string | null,
        uom: string | null,
        purchaseUom: string | null,
        weight: number | null,
        caratRating: string | null,
        canBeSold: boolean | null,
        canBeBought: boolean | null,
        productType: string | null,
        providerTax: string | null,
        customerTax: string | null,
        tags: string | null,
        retailPrice: number | null,
        cost: number | null,
        observations: string | null,
        pawnNo: string | null,
        pawnType: string | null,
        stoneWeight: number | null,
        brand: string | null,
        model: string | null,
        series: string | null,
        name: string | null,
        productCategory: string,
        branch: string
    ) {
        super();
        this.internalRef = internalRef;
        this.barcode = barcode;
        this.description = description;
        this.uom = uom;
        this.purchaseUom = purchaseUom;
        this.weight = weight;
        this.caratRating = caratRating;
        this.canBeSold = canBeSold;
        this.canBeBought = canBeBought;
        this.productType = productType;
        this.providerTax = providerTax;
        this.customerTax = customerTax;
        this.tags = tags;
        this.retailPrice = retailPrice;
        this.cost = cost;
        this.observations = observations;
        this.pawnNo = pawnNo;
        this.pawnType = pawnType;
        this.stoneWeight = stoneWeight;
        this.brand = brand;
        this.model = model;
        this.series = series;
        this.name = name;
        this.productCategory = productCategory;
        this.branch = branch;
    }

    public static fromJSON(record: IInventoryItem): InventoryItem {
        if (
            !("internal_ref" in record) ||
            !("barcode" in record) ||
            !("description" in record) ||
            !("uom" in record) ||
            !("purchase_uom" in record) ||
            !("weight" in record) ||
            !("carat_rating" in record) ||
            !("can_be_sold" in record) ||
            !("can_be_bought" in record) ||
            !("product_type" in record) ||
            !("provider_tax" in record) ||
            !("customer_tax" in record) ||
            !("tags" in record) ||
            !("retail_price" in record) ||
            !("cost" in record) ||
            !("observations" in record) ||
            !("pawn_no" in record) ||
            !("pawn_type" in record) ||
            !("stone_weight" in record) ||
            !("brand" in record) ||
            !("model" in record) ||
            !("series" in record) ||
            !("name" in record) ||
            !("product_category" in record) ||
            !("branch" in record)
        ) {
            throw this.missingRequiredFields();
        }

        if (record.weight !== null && isNaN(record.weight)) {
            throw new TypeError("InventoryItem: Expected 'weight' to be a number.");
        }

        if (record.retail_price !== null && isNaN(record.retail_price)) {
            throw new TypeError("InventoryItem: Expected 'retail_price' to be a number.");
        }

        if (record.cost !== null && isNaN(record.cost)) {
            throw new TypeError("InventoryItem: Expected 'cost' to be a number.");
        }

        if (record.stone_weight !== null && isNaN(record.stone_weight)) {
            throw new TypeError("InventoryItem: Expected 'stone_weight' to be a number.");
        }

        if (record.can_be_sold !== null && typeof record.can_be_sold !== "boolean") {
            throw new TypeError("InventoryItem: Expected 'can_be_sold' to be a boolean.");
        }

        if (record.can_be_bought !== null && typeof record.can_be_bought !== "boolean") {
            throw new TypeError("InventoryItem: Expected 'can_be_bought' to be a boolean.");
        }

        return new InventoryItem(
            record.internal_ref,
            record.barcode,
            record.description,
            record.uom,
            record.purchase_uom,
            record.weight === null ? null : Number(record.weight),
            record.carat_rating,
            record.can_be_sold,
            record.can_be_bought,
            record.product_type,
            record.provider_tax,
            record.customer_tax,
            record.tags,
            record.retail_price === null ? null : Number(record.retail_price),
            record.cost === null ? null : Number(record.cost),
            record.observations,
            record.pawn_no,
            record.pawn_type,
            record.stone_weight === null ? null : Number(record.stone_weight),
            record.brand,
            record.model,
            record.series,
            record.name,
            record.product_category,
            record.branch
        );
    }

    public costUSD(): string | null {
        return this.cost === null ? null : commaSeparated(this.cost);
    }

    public retailPriceUSD(): string | null {
        return this.retailPrice === null ? null : commaSeparated(this.retailPrice);
    }

    public weightG(): string | null {
        return this.weight === null ? null : commaSeparated(this.weight, 1);
    }

    public stoneWeightG(): string | null {
        return this.stoneWeight === null ? null : commaSeparated(this.stoneWeight, 1);
    }

    public taglist(): string[] {
        return this.tags?.split(",").filter(Boolean).map(t => t.trim()) ?? [];
    }

    public hasTags(): boolean {
        return this.taglist().length !== 0;
    }
}
