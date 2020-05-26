const puppeteer = require('puppeteer');

(async () => {
  const argv = process.argv;
  const uid = argv.splice(2);	
  const browser = await puppeteer.launch(
	  {       
		  args: [ '--use-fake-ui-for-media-stream' ],
		  headless: false,
		  slowMo: 100,
		  ignoreHTTPSErrors : true}
  );
  const page = await browser.newPage();
  await page.goto('https://47.106.74.130:8441/webRtc.html');
  await page.screenshot({path: 'audience.png'});
  await page.type('input[id=userName]','audience-'+uid);
  await page.type('input[id=roomName]','xiaopangRoom');
  await page.click('#type2');
  await page.click('#joinRoom');
  await page.screenshot({path: 'audience2.png'});	
})();
