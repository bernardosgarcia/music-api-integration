const fs = require('fs');
const path = require('path');

export const deleteAllFoldersAndFiles = () => {
    const folderPath = path.join(__dirname, '../../../tmp/files/');

    console.log('folder path', folderPath)

    try {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log('Pasta e seu conteúdo deletados com sucesso!');
    } catch (err) {
      console.error('Erro ao deletar a pasta:', err);
    }
}