import { Request, Response } from 'express';
import { processSongService } from '../services/processSongService';

export class SongController {
    async getSongStatus(req: Request, res: Response) {
        res.json({status: 'ok'});
    }

    async testProcessSong(req: Request, res: Response) {
        const songUrl = await processSongService.processSongsFolder();
        res.json({songUrl});
    }
}

export const songController = new SongController();

