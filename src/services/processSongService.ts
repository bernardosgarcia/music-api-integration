import Moises from "moises/sdk"
import { env } from "../config/env"
import constants from "../config/constants"
import { hasFilesWithExtension } from "../utils/directoryScanner"
import readDirAndConvertToMP3 from "../utils/convertFile"
import { ExceptionMessages } from "@google-cloud/storage/build/cjs/src/storage"
var fs = require('fs');

const moises = new Moises({ apiKey: env.MUSIC_AI_API_KEY })

class ProcessSongService {
    async processSongsFolder() {
        try {
            console.log('Initializing process song')
            const ABORTED = 'Aborted';
    
            if (!fs.existsSync(constants.MUSIC_AI_INPUT_FOLDER_PATH)) {
                console.log('No has: ', constants.MUSIC_AI_INPUT_FOLDER_PATH)
                return
            }
    
            if (!fs.existsSync(constants.MUSIC_AI_OUTPUT_WAV_FOLDER_PATH)) {
                console.log('Creating', constants.MUSIC_AI_OUTPUT_WAV_FOLDER_PATH)
                fs.mkdirSync(constants.MUSIC_AI_OUTPUT_WAV_FOLDER_PATH, { recursive: true });
            }

            if (!fs.existsSync(constants.MUSIC_AI_OUTPUT_MP3_FOLDER_PATH)) {
                console.log('Creating', constants.MUSIC_AI_OUTPUT_MP3_FOLDER_PATH)
                fs.mkdirSync(constants.MUSIC_AI_OUTPUT_MP3_FOLDER_PATH, { recursive: true });
            }
    
            const hasFiles = await hasFilesWithExtension(
                constants.MUSIC_AI_INPUT_FOLDER_PATH,
                constants.MUSIC_AI_INPUT_FILE_TYPE
            );
    
            console.log('hasFiles?', hasFiles);
            if (!hasFiles) {
                console.log('Does not have files with .mp3 extension');
                throw new Error('Does not have files with.mp3 extension');
            }
    
            console.log('Starting process folder...');
    
            const response = await moises.processFolder(
                constants.MUSIC_AI_WORKFLOW,
                constants.MUSIC_AI_INPUT_FOLDER_PATH,
                constants.MUSIC_AI_OUTPUT_WAV_FOLDER_PATH,
                {}
            );
            
            console.log('Response', response)
    
            await readDirAndConvertToMP3(constants.MUSIC_AI_OUTPUT_WAV_FOLDER_PATH, constants.MUSIC_AI_OUTPUT_MP3_FOLDER_PATH)
    
            if (response === ABORTED) {
                console.log(ABORTED);
                throw new Error(ABORTED);
            }
    
            console.log(response);
            return response;
        } catch (err) {
            console.log('Error process song', err) 
            throw new Error(`${err}`)
        }
    };
}

export const processSongService = new ProcessSongService();