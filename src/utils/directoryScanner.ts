import { promises as fs } from 'fs';
import path from 'path';

export const hasFilesWithExtension = async (dirPath: string, extension: string): Promise<boolean> => {
    try {
        const files = await fs.readdir(dirPath, { withFileTypes: true });
        return files
            .filter(file => file.isFile())
            .some(file =>
                path.extname(file.name).toLowerCase() === extension.toLowerCase()
            );
    } catch (error) {
        console.error(error);
        return false;
    }
}