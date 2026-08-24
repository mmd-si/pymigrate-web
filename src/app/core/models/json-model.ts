export abstract class JSONModel {
    protected static missingRequiredFields(): TypeError {
        return new TypeError(`${this.name}: JSON object missing required fields.`);
    }

    protected static incorrectDateFormat(): TypeError {
        return new TypeError(`${this.name}: incorrect date format.`);
    }

    protected static isNotMember(value: string, enumName?: string): TypeError {
        return new TypeError(`${this.name}: Value '${value}' is not a member of enum${enumName ? " " + enumName : ""}.`);
    }
}