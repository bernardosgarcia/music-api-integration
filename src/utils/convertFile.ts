import fs from 'fs';
import path from 'path';
var ffmpeg = require('fluent-ffmpeg');

const convertToMP3 = async (inputFile: string, outputFile: string): Promise<void> => {
  return new Promise((resolve, reject) => {
      ffmpeg(inputFile)
          .output(outputFile)
          .withAudioBitrate('192k')
          .on('end', () => {
              console.log('Successfully converted to MP3!');
              resolve();
          })
          .on('error', (err: any) => {
              console.error('Error during conversion: ', err);
              reject(err);
          })
          .run();
  });
};

const readDirAndConvertToMP3 = async (currentPath: string, outputPath: string): Promise<void> => {
    console.log('Current Path', currentPath);
    console.log('Output Path', outputPath);

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    try {
        const files = await fs.promises.readdir(currentPath);
        for (const file of files) {
            const filePath = path.join(currentPath, file);
        
            if (fs.statSync(filePath).isDirectory()) {
                console.log(`Encontrado diretório: ${file}`);
                await readDirAndConvertToMP3(filePath, outputPath);
            } else if (file.endsWith('.wav')) {
                const outputFilePath = path.join(outputPath, file.replace('.wav', '.mp3'));
                console.log(`Convertendo ${filePath} para ${outputFilePath}`);
                await convertToMP3(filePath, outputFilePath);
                console.log('Converted');
            }
        }
    } catch (err) {
        console.error('Erro ao ler diretório:', err);
    }
};

export default readDirAndConvertToMP3;
