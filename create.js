const puppeteer = require('puppeteer');
const argv = process.argv;
var argumentsx = argv.splice(1);
console.log(argumentsx[1]);
let createLength = argumentsx[1];
console.log(createLength);

(async () => {
    const browser = await puppeteer.launch({
        args: [
            // '--use-fake-device-for-media-stream', //使用伪造的视频流
            '--use-fake-ui-for-media-stream', //不需要手动点允许摄像头
            '-no-sandbox', //window
            //  '--use-file-for-fake-audio-capture=/home/durant/durantismyidol/1.wav', //音频地址
            //  '--use-file-for-fake-video-capture=/home/durant/durantismyidol/1.y4m'  //视频地址
        ],
        headless: false,  //false 浏览器可见
        slowMo: 100,
        ignoreHTTPSErrors: true  //忽略HTTPS
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