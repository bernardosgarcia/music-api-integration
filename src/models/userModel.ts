import { UUID } from "crypto";

interface UserModel {
    user?: {
        id: UUID;
        displayName: string;
        email?: string;
    }
}

export default UserModel;