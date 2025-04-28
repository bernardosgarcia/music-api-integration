import { UUID } from "crypto";
import { SongStatusEnum } from "../enums/songStatusEnum";

export interface SongModel extends Document {
    songId: UUID;
    songName: string;
    songVocalLink: string;
    songInstrumentalLink: string;
    songStatus: SongStatusEnum;
    songStatus: SongStatusEnum;
    songCreatedAt: Date; 
}