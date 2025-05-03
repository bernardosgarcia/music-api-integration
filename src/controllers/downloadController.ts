import { ok } from "assert"
import { downloadService } from "../services/downloadService"

export class downloadController {
    static async downloadMusic(req: any, res: any) {
        const data = req.body
        const init = Date.now()
        
        const music = downloadService.getMusic(data)
        
        const url = await downloadService.searchMusic(await music)
        console.log(url)

        //const shortUrl = await downloadService.accessPage(url) ?? ""
        
        const download = await downloadService.downloadMusic(url, "C:\\Users\\Muril_vbeysh7\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe")

        console.log(download)

        const time = Date.now() - init
        console.log (time)

        return music
    }

    static async downloadPlylist(req: any, res: any) {
        const data = req.body
        const init = Date.now()
        
        const playlist = downloadService.getPlaylist(data)
        
        const url = await downloadService.searchPlaylist(await playlist)
        console.log(url)

        // const shortUrl = await downloadService.accessPage(url) ?? ""
        
        const download = await downloadService.downloadPlaylist(url, "C:\\Users\\Muril_vbeysh7\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe")

        // console.log(download)

        const time = Date.now() - init
        console.log (time)

        return ok
    }
}