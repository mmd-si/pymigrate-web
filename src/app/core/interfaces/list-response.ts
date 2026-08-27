export interface ListResponse<T> {
    success: boolean;
    message: string;
    data: Array<T>;
    meta: Record<string, any> | null;
}
