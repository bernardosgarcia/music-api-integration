import { downloadService } from "../services/downloadService"

export class downloadController {
    static async downloadMusic(req: any, res: any) {
        const data = req.body
        const init = Date.now()
        
        const music = downloadService.getPlaylist(data)

        return music
    }
}