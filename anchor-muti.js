const puppeteer = require('puppeteer');
const argv =process.argv;
var  argumentsx = argv.splice(2);
console.log(argumentsx);
let roomName = argumentsx[0];
let uid = argumentsx[1];
(async () => {
  const browser = await puppeteer.launch(
	  {       
		  args:
		  [     '-no-sandbox',  
	            '--use-fake-device-for-media-stream',
	            '--use-fake-ui-for-media-stream',		  
		        '--use-file-for-fake-audio-capture='+process.cwd()+'/1.wav',
	            '--use-file-for-fake-video-capture='+process.cwd()+'/1.mjpeg'
		  ],
		  headless: false,
		  slowMo: 100,
		  ignoreHTTPSErrors : true}
  );
  for(let i=0;i<uid;i++)
 {
  const page = await browser.newPage();
  await page.goto('https://47.106.74.130:8441/webRtc.html');
  // await page.screenshot({path: 'example.png'});
  await page.type('input[id=userName]','xiaopang'+i);
  await page.type('input[id=roomName]',roomName+'-'+getLocalIP()+'-'+i);
  await page.click('#type1');
  await page.click('#createRoom');
  // await page.screenshot({path: 'example2.png'});
 }	 
})();



function getLocalIP() {
    const os = require('os');
    const osType = os.type(); //系统类型
    const netInfo = os.networkInterfaces(); //网络信息
    let ip = '';
    if (osType === 'Windows_NT') { 
        for (let dev in netInfo) {
        	//win7的网络信息中显示为本地连接，win10显示为以太网
            if (dev === '本地连接' || dev === '以太网') {
                for (let j = 0; j < netInfo[dev].length; j++) {
                    if (netInfo[dev][j].family === 'IPv4') {
                        ip = netInfo[dev][j].address;
                        break;
                    }
                }
            }
        }

    } else if (osType === 'Linux') {
        ip = netInfo.eth0[0].address;
    }

    return ip;
}

