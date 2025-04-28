import { UUID } from "crypto";
<<<<<<< HEAD
=======

>>>>>>> c3e919e (Fix - Song model imports)
import { SongStatusEnum } from "../enums/songStatusEnum";

export interface SongModel extends Document {
    songId: UUID;
    songName: string;
    songVocalLink: string;
    songInstrumentalLink: string;
    songStatus: SongStatusEnum;
    songCreatedAt: Date; 
}