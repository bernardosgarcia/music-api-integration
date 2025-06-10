import path = require("path");
var { spawn } = require('child_process');
var ytd = require("yt-search")
var fs = require('fs');
import { env } from '../config/env';

export default class playlistDownloadService {

    static async postPlaylist ( playlistData : any ) {
        const listSearch : Array<string> = []

        const value = playlistData.forEach((element: any)=> {
            const {song, author} = element
            const search = song + " - " + author
            
            listSearch.push(search)
        })
        return listSearch
    }

    static async searchPlaylist ( playlist : Array<string> ) {
        const links : Array<string> = []

        await Promise.allSettled((playlist.map(async (element) => {
            const resultado = await ytd(element)
            const video = resultado.videos[0]
            links.push(video.url)
        })))
        return links
    }

    static async downloadPlaylist (url : Array<string>) {
        if(!url)
            console.error("Empty url")

        const ffmpegPath = env.FFMPEG_PATH;

        if (!ffmpegPath) {
            console.error('ffmpeg path is not specified.');
            return;
        }

        const outputPath = path.join(__dirname, 'output', '%(title)s.%(ext)s');
        const outputDir = path.dirname(outputPath);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        try {
            await Promise.allSettled((url.map((element) => {
                return new Promise((resolve, reject) => {
                    const download = spawn('yt-dlp', [
                        '--ffmpeg-location', ffmpegPath,
                        '-f', 'bestaudio',
                        '--extract-audio',
                        '--audio-format', 'mp3',
                        '-o', outputPath,
                        element
                    ])
                    //download.stdout.on('data', (data: any) => {console.log(`stdout: ${data}`) })
                    //download.stderr.on('data', (data: any) => {console.error(`stderr: ${data}`)})
                    download.on('close', (code: any) => { resolve(code)})
                    download.on('error', (err: any) => {console.error(`Error Download: ${element}`, err); reject(err)})
                })
            })))
        }catch (err) {
            return console.error(err)
        }
    }
}

// Necessario ter o python / yt-dlp / ffmpeg -- instalar no Doccker
// ffmpeg precisa ter o caminho dele ali em cima / Pode ser passado pelo controller
