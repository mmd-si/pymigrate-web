import { toMMDTitle } from "@core/utils";
import { JSONModel } from "./json-model";

export interface IBranch {
    id: number;
    name: string;
    acronym: string | null;
}

export class Branch extends JSONModel {
    id: number;
    name: string;
    acronym: string | null;

    private constructor(id: number, name: string, acronym: string | null) {
        super();
        this.id = id;
        this.name = name;
        this.acronym = acronym;
    }

    public static fromJSON(record: IBranch): Branch {
        if (!("id" in record) || !("name" in record) || !("acronym" in record)) {
            throw this.missingRequiredFields();
        }

        if (isNaN(record.id)) {
            throw new TypeError("Branch: Expected 'id' to be a number.")
        }

        return new Branch(Number(record.id), record.name, record.acronym);
    }

    public branchName(): string {
        return toMMDTitle(this.name);
    }

    public hasAcronym(): boolean {
        return this.acronym !== null;
    }
}