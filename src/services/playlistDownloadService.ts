import path = require("path");
var { spawn } = require('child_process');
var ytd = require("yt-search")

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

    static async downloadPlaylist (url : Array<string>, loc_ffmpeg?: string) {
        if(!url)
            console.error("Empty url")
        const outputPath = path.join(__dirname, '../../assets/songs/input_files/%(title)s.%(ext)s');
        try {
            await Promise.allSettled((url.map((element) => {
                return new Promise((resolve, reject) => {
                    const download = spawn('yt-dlp', [
                        '--ffmpeg-location', loc_ffmpeg,
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
