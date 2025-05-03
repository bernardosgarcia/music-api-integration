import puppeteer = require("puppeteer")
const  ytd = require("yt-search")

export class downloadService {

    static async getPlaylist ( playlistData : any ) {
        const {music, author, id} = playlistData
        if( !music || !author || !id){
            return("Campo Vazio")            
        }
        const search = music + " - " + author
        console.log(search)
        return search
    }

    static async searchMusic ( music : string )  {
        const resultado = await ytd(music);
        const video = resultado.videos[0];
        return video.url;
    }


}