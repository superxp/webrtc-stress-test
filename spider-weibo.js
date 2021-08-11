const puppeteer = require('puppeteer');

let cookie = '_T_WM=99706473635; WEIBOCN_FROM=1110005030; ALF=1594528443; SCF=Akcp-0ydywoBRe40wLc7SOo5NtbdJLpOFZXzUnwMxxlA6OSJMIhG1P_La8Heb5rej31byODVrpyFF3sL5npq1_o.; SUB=_2A25z53XvDeThGeNL41AY8i7KyDSIHXVRKBunrDV6PUNbktANLRP2kW1NSM6yAWJWyEjRaVEzWNQU6itw-uPA6eKy; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFDFab7aimSFZI.1SPKUPsF5JpX5KMhUgL.Fo-f1hz4eo5ce0n2dJLoI7yGdcBR1h-NSBtt; SUHB=0laVlsCNRbkueo; SSOLoginState=1591936447; MLOGIN=1; XSRF-TOKEN=31c75f; M_WEIBOCN_PARAMS=from%3D100505%26luicode%3D10000011%26lfid%3D1005055582920638%26fid%3D1076035582920638%26uicode%3D10000011';
  
const addCookies = async (cookies_str, page, domain) => {
    let cookies = cookies_str.split(';').map(
        pair => {
        let name = pair.trim().slice(0, pair.trim().indexOf('='));
        let value = pair.trim().slice(pair.trim().indexOf('=') + 1);
        return {name, value, domain}
    });
    await Promise.all(cookies.map(pair => {
        console.log(pair);
        return page.setCookie(pair)
    }))
};

(async () => {
  const browser = await puppeteer.launch(
	  {       
		  args:
		  [
	        '-no-sandbox'
		  ],
		  headless: false,
		  slowMo: 100,
		  ignoreHTTPSErrors : true}
  );
  const page = await browser.newPage();
  await page.goto('https://weibo.com/');
  await page.type('input[name=username]','18606501415');

  

  

  await page.screenshot({path: 'example.png'});
})();
