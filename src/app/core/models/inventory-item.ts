import { JSONModel } from "./json-model";

interface IInventoryItem {
    internal_ref: string;
    barcode: string;
    name: string;
    description: string;
    uom: string;
    purchase_uom: string;
    weight: number;
    carat_rating: string;
    can_be_sold: boolean;
    can_be_bought: boolean;
    product_type: string;
    provider_tax: string;
    customer_tax: string;
    tags: string;
    retail_price: number;
    cost: number;
    observations: string;
    pawn_no: string;
    stone_weight: number;
    brand: string;
    model: string;
    series: string;
    branch: string;
    product_category: string;
}

export class InventoryItem extends JSONModel {
    public internalRef: string;
    public barcode: string;
    public name: string;
    public description: string;
    public uom: string;
    public purchaseUom: string;
    public weight: number;
    public caratRating: string;
    public canBeSold: boolean;
    public canBeBought: boolean;
    public productType: string;
    public providerTax: string;
    public customerTax: string;
    public tags: string;
    public retailPrice: number;
    public cost: number;
    public observations: string;
    public pawnNo: string;
    public stoneWeight: number;
    public brand: string;
    public model: string;
    public series: string;
    public branch: string;
    public productCategory: string;

    private constructor(
        internalRef: string,
        barcode: string,
        name: string,
        description: string,
        uom: string,
        purchaseUom: string,
        weight: number,
        caratRating: string,
        canBeSold: boolean,
        canBeBought: boolean,
        productType: string,
        providerTax: string,
        customerTax: string,
        tags: string,
        retailPrice: number,
        cost: number,
        observations: string,
        pawnNo: string,
        stoneWeight: number,
        brand: string,
        model: string,
        series: string,
        branch: string,
        productCategory: string
    ) {
        super();
        this.internalRef = internalRef;
        this.barcode = barcode;
        this.name = name;
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
        this.stoneWeight = stoneWeight;
        this.brand = brand;
        this.model = model;
        this.series = series;
        this.branch = branch;
        this.productCategory = productCategory;
    }

    public static fromJSON(json: string): InventoryItem {
        const record = JSON.parse(json) as IInventoryItem;

        if (
            !("internal_ref" in record) ||
            !("barcode" in record) ||
            !("name" in record) ||
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
            !("stone_weight" in record) ||
            !("brand" in record) ||
            !("model" in record) ||
            !("series" in record) ||
            !("branch" in record) ||
            !("product_category" in record)
        ) {
            throw this.missingRequiredFields();
        }

        if (isNaN(record.weight)) {
            throw new TypeError("InventoryItem: Expected 'weight' to be a number.");
        }

        if (isNaN(record.retail_price)) {
            throw new TypeError("InventoryItem: Expected 'retail_price' to be a number.");
        }

        if (isNaN(record.cost)) {
            throw new TypeError("InventoryItem: Expected 'cost' to be a number.");
        }

        if (isNaN(record.stone_weight)) {
            throw new TypeError("InventoryItem: Expected 'stone_weight' to be a number.");
        }

        if (typeof record.can_be_sold !== "boolean") {
            throw new TypeError("InventoryItem: Expected 'can_be_sold' to be a boolean.");
        }

        if (typeof record.can_be_bought !== "boolean") {
            throw new TypeError("InventoryItem: Expected 'can_be_bought' to be a boolean.");
        }

        return new InventoryItem(
            record.internal_ref,
            record.barcode,
            record.name,
            record.description,
            record.uom,
            record.purchase_uom,
            Number(record.weight),
            record.carat_rating,
            record.can_be_sold,
            record.can_be_bought,
            record.product_type,
            record.provider_tax,
            record.customer_tax,
            record.tags,
            Number(record.retail_price),
            Number(record.cost),
            record.observations,
            record.pawn_no,
            Number(record.stone_weight),
            record.brand,
            record.model,
            record.series,
            record.branch,
            record.product_category
        );
    }
}
