import path = require("path");
import puppeteer = require("puppeteer")
import { ok } from "assert";
const { spawn } = require('child_process');
const ytd = require("yt-search")

export class downloadService {

    static async getMusic ( musicData : any ) {
        const {music, author, id} = musicData
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

    static async downloadMusic (url : String, loc_ffmpeg?: String){
        loc_ffmpeg = loc_ffmpeg || "C:\\Users\\Muril_vbeysh7\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe"
        url = url || "https://youtube.com/watch?v=n5wxZ_OBUXk"
        const outputPath = path.join(__dirname, '../assets/songs/input_files/%(title)s.%(ext)s');

        try {
            const download = await spawn('yt-dlp', [
                '--ffmpeg-location', loc_ffmpeg,
                '-f', 'bestaudio',
                '--extract-audio',
                '--audio-format', 'mp3',
                '-o', outputPath,
                url
              ]);

        download.stdout.on('data', (data : any ) => {
            console.error(`Resultado no Python: ${data.toString()}`)
        })

        download.stderr.on('data', (data : any ) => {
            console.error(`Error no Python: ${data.toString()}`)
        })

        download.on('close', (code : any ) => {
            if (code !== 0) {
                console.error(`Processo Python finalizado com código de erro: ${code}`);
              } else {
                console.log('Processo Python concluído com sucesso');
              }
        })

    } catch (err){
        return console.error(err);
        
    }



    }
    static async getPlaylist ( playlistData : any ) {
        const listsearch : Array<String> = []

        const value = playlistData.forEach((element: any)=> {
            const {music, author} = element
            const search = music + " - " + author
            
            listsearch.push(search)
        });
        console.log(listsearch)
        return listsearch
    }

    static async searchPlaylist ( playlist : Array<String> )  {
        const links : Array<String> = []

        await Promise.allSettled((playlist.map(async (element) => {
            const resultado = await ytd(element);
            
            const video = resultado.videos[0];

            links.push(video.url)
        })))

        return links;
    }

    static async accessPagePlaylist ( link : string ) {
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

    static async downloadPlaylist (url : Array<String>, loc_ffmpeg?: String){
        loc_ffmpeg = loc_ffmpeg || "C:\\Users\\Muril_vbeysh7\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe"
        url = url || "https://youtube.com/watch?v=n5wxZ_OBUXk"
        const outputPath = path.join(__dirname, '../assets/songs/input_files/%(title)s.%(ext)s');

        await Promise.allSettled((url.map(async (element) => {
            const download = await spawn('yt-dlp', [
                '--ffmpeg-location', loc_ffmpeg,
                '-f', 'bestaudio',
                '--extract-audio',
                '--audio-format', 'mp3',
                '-o', outputPath,
                element
              ]);
            //   download.stdout.on('data', (data : any ) => {
            //       console.error(`Resultado no Python: ${data.toString()}`)
            //   })
      
            //   download.stderr.on('data', (data : any ) => {
            //       console.error(`Error no Python: ${data.toString()}`)
            //   })
      
            //   download.on('close', (code : any ) => {
            //       if (code !== 0) {
            //           console.error(`Processo Python finalizado com código de erro: ${code}`);
            //         } else {
            //           console.log('Processo Python concluído com sucesso');
            //         }
            //   })
        })))

        return ok("download conclued")
    }
}

// Necessario ter o python / yt-dlp / ffmpeg -- instalar no Doccker
// ffmpeg precisa ter o caminho dele ali em cima / Pode ser passado pelo controller