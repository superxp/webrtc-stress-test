const puppeteer = require('puppeteer');
const argv =process.argv;
var  argumentsx = argv.splice(2);
console.log(argumentsx);
let uid = argumentsx[1];
let roomName = argumentsx[0];

 (async () => {
  const browser = await puppeteer.launch(
	  {       
		  args: [ '--use-fake-ui-for-media-stream' ],
		  headless: false,
		  slowMo: 100,
		  ignoreHTTPSErrors : true}
  );
  for(let i=0;i<uid;i++)
{
  const page = await browser.newPage();
  await page.goto('https://47.106.74.130:8441/webRtc.html');
  await page.screenshot({path: 'audience.png'});
  await page.type('input[id=userName]','audience-'+i);
  await page.type('input[id=roomName]',roomName);
  await page.click('#type2');
  await page.click('#joinRoom');
  await page.screenshot({path: 'audience2.png'});
  }
  }	  
)();

