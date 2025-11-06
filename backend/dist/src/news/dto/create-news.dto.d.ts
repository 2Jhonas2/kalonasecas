export declare enum NewsType {
    NEW_PACKAGE = "NEW_PACKAGE",
    NEW_PLACE = "NEW_PLACE",
    INFO = "INFO"
}
export declare class CreateNewsDto {
    title: string;
    description: string;
    type: NewsType;
    entityId?: string;
    imageUrl?: string;
    ttlDays?: number;
    createdAt?: string;
    expiresAt?: string;
}
