export interface ItemResponse<T> {
    success: boolean;
    message: string;
    data: T;
    metadata: Record<string, any> | null;
}
