export interface ItemResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta: Record<string, any> | null;
}
