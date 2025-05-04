import {Request, Response} from 'express';
import songDownloadService  from "../services/songDownloadService"
import playlistDownloadService from "../services/playlistDownloadService"

export class downloadController {
    static async downloadSong(req: Request, res: Response) {
        try{
            const dataSong = req.body
            if (!dataSong)
                return res.status(400).json({ message : "The request body data is empty."})

            const song = await songDownloadService.postSong(dataSong)
            const url = await songDownloadService.searchSong(song)
            //const shortUrl = await songDownloadService.accessPage(url) ?? ""
            await songDownloadService.downloadSong(url, "C:\\Users\\Muril_vbeysh7\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe")
    
            return res.status(200).json({message : "Succes download song"})
        } catch (err) {
            return res.status(500).json({message : "Error download song"})
        }
    }

    static async downloadPlaylist(req: Request, res: Response) {
        try{
            const dataPlaylist = req.body   
            if (!dataPlaylist)
                return res.status(400).json({ message : "The request body data is empty."}) 
    
            const playlist = await playlistDownloadService.postPlaylist(dataPlaylist)
            const url = await playlistDownloadService.searchPlaylist(playlist)
            // const shortUrl = await playlistDownloadService.accessPage(url) ?? ""
            await playlistDownloadService.downloadPlaylist(url, "C:\\Users\\Muril_vbeysh7\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe")
            return res.status(200).json({message : "Succes download playlist"})
        } catch (err) {
            return res.status(500).json({message : "Error download playlist"})
        }
    }
}