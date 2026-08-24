import { JSONModel } from "./json-model";

interface IBranch {
    id: number;
    name: string;
}

export class Branch extends JSONModel {
    id: number;
    name: string;

    private constructor(id: number, name: string) {
        super();
        this.id = id;
        this.name = name;
    }

    public static fromJSON(json: IBranch): Branch {
        if (!("id" in json) || !("name" in json)) {
            throw this.missingRequiredFields();
        }

        if (isNaN(json.id)) {
            throw new TypeError("Branch: Expected 'id' to be a number.")
        }

        return new Branch(Number(json.id), json.name);
    }
}