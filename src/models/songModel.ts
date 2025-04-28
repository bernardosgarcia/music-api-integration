import { UUID } from "crypto";
<<<<<<< HEAD
import { SongStatusEnum } from "../enums/songStatusEnum";
=======
import { SongStatusEnum } from "../enums/SongStatusEnum";
>>>>>>> 5e1fbc5e02d42cd583c12bcf83df6a3ceed89a39

export interface SongModel extends Document{
    songId: UUID;
    songName: string;
    songVocalLink: string;
    songInstrumentalLink: string;
    songStatus: SongStatusEnum;
    songCreatedAt: Date; 
}