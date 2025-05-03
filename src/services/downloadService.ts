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

    static async accessPage ( link : string ) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage()

        try{   
            await page.goto(`${link}`);
            
            await page.waitForSelector('button[title="Compartilhar"]', { timeout: 5000 })

            const botoes = await page.$$(`button[title="Compartilhar"]`);

            await botoes[1].click();

            await page.evaluate(() => {
                const btn = document.querySelector('button[title="Compartilhar"]'[2]);
                if (btn) (btn as HTMLElement).click();
              });
    
            await page.waitForSelector('input#share-url', { timeout: 5000 });
    
            const url = await page.$eval('input#share-url', input => input.value);

            await browser.close();
    
            return url
        }catch (err){
            console.error(err)
        }
    }
}