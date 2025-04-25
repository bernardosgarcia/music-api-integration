import { UUID } from "crypto";

export interface SongModel extends Document{
    songId: UUID;
    songName: string;
    songVocalLink: string;
    songInstrumentalLink: string;
    songCreatedAt: Date; 
}