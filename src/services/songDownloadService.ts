import path = require("path");
var { spawn } = require('child_process');
var ytd = require("yt-search")

export default class songDownloadService {

    static async postSong ( songData : any ) {
        const {song, author} = songData
        if( !song || !author)
            console.error("Empty song or author")

        const search = song + " - " + author
        return search
    }

    static async searchSong ( song : string )  {
        const result = await ytd(song)
        const video = result.videos[0]
        return video.url
    }

    //Depreceated
    static async downloadSong (url : string, loc_ffmpeg?: string){
        if(!url)
            console.error("Empty url")
        const outputPath = path.join(__dirname, '../assets/songs/input_files/%(title)s.%(ext)s');

        return new Promise((resolve, reject) => {
            const download = spawn('yt-dlp', [
                '--ffmpeg-location', loc_ffmpeg,
                '-f', 'bestaudio',
                '--extract-audio',
                '--audio-format', 'mp3',
                '-o', outputPath,
                url
                ])
            download.stdout.on('data', (data: any) => {console.log(`stdout: ${data}`) })
            download.stderr.on('data', (data: any) => {console.error(`stderr: ${data}`)})
            download.on('close', (code: any) => { resolve(code)})
            download.on('error', (err: any) => {console.error('Error Download:', err); reject(err)})
        })
    }
}
// Necessario ter o python / yt-dlp / ffmpeg -- instalar no Doccker
// ffmpeg precisa ter o caminho dele ali em cima / Pode ser passado pelo controller