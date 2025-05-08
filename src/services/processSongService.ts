import Moises from "moises/sdk"
import env from "../config/env"
import constants from "../config/constants"
import { hasFilesWithExtension } from "../utils/directoryScanner"

const moises = new Moises({ apiKey: env.MUSIC_AI_API_KEY })

class ProcessSongService {
    async processSongsFolder() {
        const ABORTED = 'Aborted';

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
            constants.MUSIC_AI_OUTPUT_FOLDER_PATH,
            {}
        );

        if (response === ABORTED) {
            console.log(ABORTED);
            throw new Error(ABORTED);
        }

        console.log(response);
        return response;
    };
}

export const processSongService = new ProcessSongService();