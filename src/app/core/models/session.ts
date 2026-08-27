import { toTitle } from "@core/utils";
import { JSONModel } from "./json-model";

export interface ISession {
    user_id: string;
    first_name: string | null;
    last_name: string | null;
    branch_id: number;
    role_id: number;
    ip_address: string;
    user_agent: string;
    data: Record<string, unknown>;
}

export class Session extends JSONModel {
    public userId: string;
    public firstName: string | null;
    public lastName: string | null;
    public branchId: number;
    public roleId: number;
    public ipAddress: string;
    public userAgent: string;
    public data: Record<string, unknown>;

    private constructor(
        userId: string,
        firstName: string | null,
        lastName: string | null,
        branchId: number,
        roleId: number,
        ipAddress: string,
        userAgent: string,
        data: Record<string, unknown>
    ) {
        super();
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.branchId = branchId;
        this.roleId = roleId;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.data = data;
    }

    public static fromJSON(record: ISession): Session {
        if (
            !("user_id" in record) ||
            !("first_name" in record) ||
            !("last_name" in record) ||
            !("branch_id" in record) ||
            !("role_id" in record) ||
            !("ip_address" in record) ||
            !("user_agent" in record) ||
            !("data" in record)
        ) {
            throw this.missingRequiredFields();
        }

        if (isNaN(record.branch_id)) {
            throw new TypeError("Session: Expected 'branch_id' to be a number.");
        }

        if (isNaN(record.role_id)) {
            throw new TypeError("Session: Expected 'role_id' to be a number.");
        }

        if (typeof record.data !== "object" || record.data === null) {
            throw new TypeError("Session: Expected 'data' to be an object.");
        }

        return new Session(
            record.user_id,
            record.first_name ?? null,
            record.last_name ?? null,
            Number(record.branch_id),
            Number(record.role_id),
            record.ip_address,
            record.user_agent,
            record.data
        );
    }

    public hasFirstName(): boolean {
        return this.firstName !== null;
    }

    public hasLastName(): boolean {
        return this.lastName !== null;
    }

    public fullName(): string {
        if (!this.hasFirstName()) return "";
        let fullName = this.firstName!;

        if (this.hasLastName()) {
            fullName += " " + this.lastName;
        }

        return toTitle(fullName);
    }
}
