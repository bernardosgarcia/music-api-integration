import {Request, Response} from 'express';
import songDownloadService  from "../services/songDownloadService"
import playlistDownloadService from "../services/playlistDownloadService"
import { deleteAllFoldersAndFiles } from "../utils/deleteFolders"
import { processSongService } from '../services/processSongService';
import { Song } from '../types/song';

export class downloadController {
    //Depreceated
    static async downloadSong(req: Request, res: Response) {
        try{
            const dataSong : Song = req.body
            if (!dataSong)
                return res.status(400).json({ message : "The request body data is empty."})

            const song = await songDownloadService.postSong(dataSong)
            const url = await songDownloadService.searchSong(song)
            //const shortUrl = await songDownloadService.accessPage(url) ?? ""
            await songDownloadService.downloadSong(url, "C:\\Users\\Muril_vbeysh7\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe")
    
            return res.status(200).json({message : "Success download song"})
        } catch (err) {
            return res.status(500).json({message : "Error download song"})
        }
    }

    static async downloadPlaylist(req: Request, res: Response) {
        console.log("Downloading playlist")
        try{
            interface Input {
                id: string;
                song: string;
                author: string;
            }

            const dataPlaylist: Input[] = req.body
            console.log(dataPlaylist)
            if (!dataPlaylist)
                return res.status(400).json({ message : "The request body data is empty."}) 

            interface Output {
                id: string;
                instrument: string;
                vocal: string;
            }

            var array_response: Output[] = [];

            for(const element of dataPlaylist) {
                console.log(element)
                const song = await playlistDownloadService.postPlaylist(element)
                const urlSong = await playlistDownloadService.searchPlaylist(song)
                console.log(urlSong)
                await playlistDownloadService.downloadPlaylist(urlSong)

                await processSongService.processSongsFolder()

                const response = await playlistDownloadService.uploadMp3ToGCS(element.id)
                array_response.push(response)

                deleteAllFoldersAndFiles();                
            }
            
            return res.status(200).json(array_response)
        } catch (err) {
            return res.status(500).json({message : "Error download playlist", err: `${err}`})
        }
    }
}