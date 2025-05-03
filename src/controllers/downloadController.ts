import { downloadService } from "../services/downloadService"

export class downloadController {
    static async downloadMusic(req: any, res: any) {
        const data = req.body
        const init = Date.now()
        
        const music = downloadService.getPlaylist(data)
        
        const url = await downloadService.searchMusic(await music)
        console.log(url)

        const shortUrl = await downloadService.accessPage(url)
        console.log(shortUrl)

        const time = Date.now() - init
        console.log (time)

        return music
    }
}