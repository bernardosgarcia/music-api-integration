import { Request, Response } from 'express';

export class SongController {
    async getSongStatus(req: Request, res: Response) {
        res.json({status: 'ok'});
    }
}

export const songController = new SongController();