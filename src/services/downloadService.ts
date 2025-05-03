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
}