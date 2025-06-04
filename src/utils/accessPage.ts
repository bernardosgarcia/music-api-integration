// import puppeteer = require("puppeteer")

// async function accessPage( link : string ) {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage()
//     try{   
//         await page.goto(`${link}`)
//         await page.waitForSelector('button[title="Compartilhar"]', { timeout: 5000 })
//         const botoes = await page.$$(`button[title="Compartilhar"]`)
//         await botoes[1].click()
//         await page.evaluate(() => {
//             const btn = document.querySelector('button[title="Compartilhar"]'[2])
//             if (btn) (btn as HTMLElement).click();
//         });
//         await page.waitForSelector('input#share-url', { timeout: 5000 })
//         const url = await page.$eval('input#share-url', input => input.value)
//         await browser.close()
//         return url
//     }catch (err){
//         console.error(err)
//     }
// }