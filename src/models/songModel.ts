import { UUID } from "crypto";
import { SongStatusEnum } from "../enums/SongStatusEnum";

export interface SongModel extends Document{
    songId: UUID;
    songName: string;
    songVocalLink: string;
    songInstrumentalLink: string;
    songStatus: SongStatusEnum;
    songCreatedAt: Date; 
}