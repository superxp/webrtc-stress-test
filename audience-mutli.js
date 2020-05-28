const puppeteer = require('puppeteer');
const argv =process.argv;
var  argumentsx = argv.splice(2);
console.log(argumentsx);
let uid = argumentsx[1];
let roomName = argumentsx[0];

 (async () => {
  const browser = await puppeteer.launch(
	  {       
		  args: [ 
		  '-no-sandbox',
		  '--use-fake-device-for-media-stream',
		  '--use-fake-ui-for-media-stream', 
		  '--use-file-for-fake-audio-capture='+process.cwd()+'/1.wav',
	      '--use-file-for-fake-video-capture='+process.cwd()+'/1.mjpeg'
		  ],
		  headless: true,
		  slowMo: 100,
		  ignoreHTTPSErrors : true}
  );
  for(let i=0;i<uid;i++)
{
  const page = await browser.newPage();
  await page.goto('https://47.106.74.130:8441/webRtc.html');
  //await page.screenshot({path: 'audience.png'});
  await page.type('input[id=userName]','audience-'+getLocalIP()+'-'+i);
  await page.type('input[id=roomName]',roomName);
  await page.click('#type2');
  await page.click('#joinRoom');
  //await page.screenshot({path: 'audience2.png'});
  }
  }	  
)();



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
	    if(netInfo.wlp1s0){
			ip = netInfo.wlp1s0[0].address;
		}
        if(netInfo.enp2s0){
			ip = netInfo.enp2s0[0].address;
		}
        if(netInfo.eth0){
			ip = netInfo.eth0[0].address;
		}		
        
    }

    return ip;
}

