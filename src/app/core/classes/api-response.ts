import { ItemResponse } from "@core/interfaces/item-response";
import { ListResponse } from "@core/interfaces/list-response";
import { JSONModel, JSONModelConstructor } from "@core/models/json-model";

export class APIResponse {
    public static itemUnpack<T extends JSONModel, U extends Record<string, any>>(cls: JSONModelConstructor<T>, response: ItemResponse<U>): T {
        return cls.fromJSON(response.data);
    }

    public static listUnpack<T extends JSONModel, U extends Record<string, any>>(cls: JSONModelConstructor<T>, response: ListResponse<U>): T[] {
        return response.data.map((item) => cls.fromJSON(item));
    }
}