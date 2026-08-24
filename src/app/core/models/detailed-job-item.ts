import { ItemResult } from "@core/enums/item-result.enum";
import { JSONModel } from "./json-model";

export interface IDetailedJobItem {
    item_id: string;
    barcode: string;
    item_name: string;
    category: string;
    result: ItemResult;
}

export class DetailedJobItem extends JSONModel {
    public id: string;
    public barcode: string;
    public name: string;
    public category: string;
    public result: ItemResult;

    private constructor(
        id: string,
        barcode: string,
        name: string,
        category: string,
        result: ItemResult
    ) {
        super();
        this.id = id;
        this.barcode = barcode;
        this.name = name;
        this.category = category;
        this.result = result;
    }

    public static fromJSON(json: string): DetailedJobItem {
        return this.fromRecord(JSON.parse(json) as IDetailedJobItem);
    }

    public static fromRecord(record: IDetailedJobItem): DetailedJobItem {
        if (
            !("item_id" in record) ||
            !("barcode" in record) ||
            !("item_name" in record) ||
            !("category" in record) ||
            !("result" in record)
        ) {
            throw this.missingRequiredFields();
        }

        if (!Object.values(ItemResult).includes(record.result as ItemResult)) {
            throw this.isNotMember(record.result, "ItemResult");
        }

        return new DetailedJobItem(record.item_id, record.barcode, record.item_name, record.category, record.result);
    }
}
