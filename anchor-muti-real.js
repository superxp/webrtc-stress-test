const puppeteer = require('puppeteer');
const argv =process.argv;
var  argumentsx = argv.splice(2);
console.log(argumentsx);
let roomName = argumentsx[0];
let uid = argumentsx[1];
for(let i=0;i<uid;i++)
{	
(async () => {
  const browser = await puppeteer.launch(
	  {       
		  args:
		  [
	           // '--use-fake-device-for-media-stream',
	            '--use-fake-ui-for-media-stream'		  
		   // '--use-file-for-fake-audio-capture=/home/durant/durantismyidol/1.wav',
	           // '--use-file-for-fake-video-capture=/home/durant/durantismyidol/1.y4m'
		  ],
		  headless: false,
		  slowMo: 100,
		  ignoreHTTPSErrors : true}
  );
  const page = await browser.newPage();
  await page.goto('https://47.106.74.130:8441/webRtc.html');
  await page.screenshot({path: 'example.png'});
  await page.type('input[id=userName]','xiaopang'+i);
  await page.type('input[id=roomName]',roomName+i);
  await page.click('#type1');
  await page.click('#createRoom');
  await page.screenshot({path: 'example2.png'});	
})();
}
