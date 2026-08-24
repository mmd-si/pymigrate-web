import { ItemResult } from "@core/enums/item-result.enum";
import { JSONModel } from "./json-model";

interface IItemStatus {
    item_id: string;
    row_id: string;
    result: ItemResult;
}

export class ItemStatus extends JSONModel {
    public itemId: string;
    public rowId: string;
    public result: ItemResult;

    private constructor(itemId: string, rowId: string, result: ItemResult) {
        super();
        this.itemId = itemId;
        this.rowId = rowId;
        this.result = result;
    }

    public static fromJSON(json: string): ItemStatus {
        const record = JSON.parse(json) as IItemStatus;

        if (!("item_id" in record) || !("row_id" in record) || !("result" in record)) {
            throw this.missingRequiredFields();
        }

        if (!Object.values(ItemResult).includes(record.result as ItemResult)) {
            throw this.isNotMember(record.result, "ItemResult");
        }

        return new ItemStatus(record.item_id, record.row_id, record.result);
    }
}