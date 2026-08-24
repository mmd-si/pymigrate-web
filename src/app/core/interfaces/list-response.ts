export interface ListResponse<T> {
    success: boolean;
    message: string;
    data: Array<T>;
    metadata: Record<string, any> | null;
}
