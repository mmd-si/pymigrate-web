import { Injectable } from "@angular/core";

interface ValueAccessor {
    (): string | null;
    isNull(): boolean;
    toInt(): number;
    toFloat() : number;
    toBoolean(): boolean;
    parse<T>(): T;
    valueOf(): string | null;
    toString(): string;
}

type Serializable = number | string | boolean | bigint | object | undefined;

@Injectable({ providedIn: "root" })
export class LocalStorageService {
    private isPrimitiveLike(value: any) {
        return ["string", "number", "boolean", "bigint", "undefined"].includes(typeof value);
    }

    private isSerializable(value: any): value is Serializable {
        return !["symbol", "function"].includes(typeof value);
    }

    public set(name: string, value: any) {
        let repr: string = "";
        if (this.isPrimitiveLike(value)) {
            repr = String(value).trim();
        } else if (Array.isArray(value)) {
            repr = JSON.stringify(value.filter(i => this.isSerializable(i)));
        } else if (typeof value === "object") {
            if (value instanceof Date) {
                repr = value.toISOString();
            } else {
                repr = JSON.stringify(Object.fromEntries(Object.entries(value).filter(([_, value]) => this.isSerializable(value))));
            }
        } else if (value === null) {
            repr = "null";
        } else {
            throw new TypeError(`Value '${value}' of type '${value.constructor.name}' is not serializable.`);
        }

        localStorage.setItem(name, repr);
    }

    public get(name: string): ValueAccessor {
        const raw = localStorage.getItem(name);

        const accessor = Object.assign(
            () => raw,
            {
                isNull() {
                    return raw === null || raw.trim() === "null";
                },

                toInt() {
                    const n = parseInt(raw!);
                    if (Number.isNaN(n)) {
                        throw new TypeError("Cannot parse int");
                    }
                    return n;
                },

                toFloat() {
                    const n = parseFloat(raw!);
                    if (Number.isNaN(n)) {
                        throw new TypeError("Cannot parse float");
                    }
                    return n;
                },

                toBoolean() {
                    if (raw === "true") return true;
                    if (raw === "false") return false;
                    throw new TypeError("Cannot parse boolean");
                },

                parse<T>() {
                    return JSON.parse(raw!) as T;
                },

                valueOf() {
                    return raw;
                },

                toString() {
                    return raw ?? "null";
                },

                [Symbol.toPrimitive]() {
                    return raw;
                },
            }
        );

        return accessor;
    }
}
