import { UUID } from "crypto";

export interface UserModel {
    user?: {
        id: UUID;
        displayName: string;
        email?: string;
    }
}