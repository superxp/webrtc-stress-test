const puppeteer = require('puppeteer');
const argv = process.argv;
var argumentsx = argv.splice(1);
console.log(argumentsx[1]);
let createLength = argumentsx[1];
console.log(createLength);

(async () => {
    const browser = await puppeteer.launch({
        args: [
            // '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream', //摄像头流
            '-no-sandbox', //window
            //  '--use-file-for-fake-audio-capture=/home/durant/durantismyidol/1.wav', //视频地址
            //  '--use-file-for-fake-video-capture=/home/durant/durantismyidol/1.y4m'
        ],
        headless: false,
        slowMo: 100,
        ignoreHTTPSErrors: true
    });
    for (let i = 0; i < createLength; i++) {
        const page = await browser.newPage();
        await page.goto('https://47.106.74.130:8441/webRtc.html');
        // await page.screenshot({
        //     path: 'example.png'
        // });

        await page.type('input[id=userName]', 'daiwen-' + i);
        await page.type('input[id=roomName]', 'daiwenRoom-' + i);
        await page.click('#type1');
        await page.click('#createRoom');

    }
})();