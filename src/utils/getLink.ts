const  ytd = require("yt-search")

export class getLinkService{
    async getLink( music : string ) {
        const response = await ytd(music)

        if (response && response.videos.length > 0) {
            const video = response.videos[0];
            console.log('Título:', video.title);
            console.log('Duração:', video.timestamp);
            console.log('URL:', video.url);
          } else {
            console.log('Nenhum vídeo encontrado.');
          }
    }
}