import path = require("path");
import constants from "../config/constants"
var { spawn } = require('child_process');
var ytd = require("yt-search")
var fs = require('fs');
import { Storage } from '@google-cloud/storage';


export default class playlistDownloadService {
    static async postPlaylist (songData: any ) {
        const song = songData.song
        const author = songData.author
        const search = song + " - " + author

        return search
    }

    static async searchPlaylist (song: string ) {
        const resultado = await ytd(song)
        const video = resultado.videos[0]

        console.log(video)

        return video.url
    }

    static async downloadPlaylist (url : string) {
        if(!url)
            console.error("Empty url")
        
        // const ffmpegPath = env.FFMPEG_PATH;
        
        // if (!ffmpegPath) {
        //     console.error('ffmpeg path is not specified.');
        //     return;
        // }

        const ytdlpPath = '/env/bin/yt-dlp';

        if (!fs.existsSync(ytdlpPath)) {
            console.error('yt-dlp não encontrado em:', ytdlpPath);
            return;
        }

        const outputPath = '/tmp/files/yt_download_mp3/%(title)s.%(ext)s';
        const outputDir = path.dirname(outputPath);

        console.log(`Output Path ${outputPath}`)

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        try {
            const response = await new Promise((resolve, reject) => {
                const download = spawn(ytdlpPath, [
                    //'--ffmpeg-location', ffmpegPath,
                    '-f', 'bestaudio',
                    '--extract-audio',
                    '--audio-format', 'mp3',
                    '-o', outputPath,
                    url
                ])
                download.stdout.on('data', (data: any) => {console.log(`stdout: ${data}`) })
                download.stderr.on('data', (data: any) => {console.error(`stderr: ${data}`)})
                download.on('close', (code: any) => { resolve(code) })
                download.on('error', (err: any) => {console.error(`Error Download: ${url}`, err); reject(err)})
            })
        } catch (err) {
            return console.error(err)
        }
    }

    static async uploadMp3ToGCS (songId: string) {
        var backingTrackUrl = ""
        var leadVocalsUrl = ""

        const localDirPath = constants.MUSIC_AI_OUTPUT_MP3_FOLDER_PATH;
        console.log('Local dir:', localDirPath)

        const storage = new Storage({
            keyFilename: 'gcloud-credentials.json',
        });
          
        const bucketName = 'music-integration-api';
        const bucket = storage.bucket(bucketName);

        try {
            if (!fs.existsSync(localDirPath)) {
              throw new Error(`Not found directory to path: ${localDirPath}`);
            }

            const files = fs.readdirSync(localDirPath);

            const mp3Files = files.filter((file: string) => path.extname(file) === '.mp3');

            if (mp3Files.length === 0) {
                console.log('No .mp3 files found in directory.');
            }
        
            const uploadFiles = async () => {
                for (const file of mp3Files) {
                    const localFilePath = path.join(localDirPath, file);
                    const fileName = `audio_${Date.now()}_${path.basename(localFilePath)}`;
                    
                    console.log('Nome do arquivo:', fileName);
        
                    const fileInBucket = bucket.file(fileName);
                    
                    try {
                        await bucket.upload(localFilePath, {
                            destination: fileName,
                            metadata: {
                                contentType: 'audio/mpeg', 
                            },
                            public: true, 
                        });
        
                        await fileInBucket.makePublic();
        
                        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
                        console.log(`Successfully to send file: ${publicUrl}`);

                        if (fileName.includes('instrument')) {
                            backingTrackUrl = publicUrl
                        }
                        
                        if (fileName.includes('vocal')) {
                            leadVocalsUrl = publicUrl
                        }
                    } catch (err) {
                        console.error(`Error to send file ${fileName}:`, err);
                    }
                }
            };

            await uploadFiles()
            
            const response = {
                id: songId,
                instrument: backingTrackUrl,
                vocal: leadVocalsUrl
            }

            console.log('JSON FINAL:', response)
            
            return response;
        
          } catch (error) {
            console.error('Erro ao fazer upload para GCS:', error);
            throw new Error(`Falha no upload: ${error}`);
          }
    }
}

// Necessario ter o python / yt-dlp / ffmpeg -- instalar no Doccker
// ffmpeg precisa ter o caminho dele ali em cima / Pode ser passado pelo controller
