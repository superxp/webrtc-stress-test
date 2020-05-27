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
 
    
 
 	 const page = await browser.newPage();
	 await page.goto('chrome://webrtc-internals/');
	 await page.click('.peer-connection-dump-root summary');
	 await page.select('#statsSelectElement','Legacy Non-Standard (callback-based) getStats() API');
	 setInterval(()=>{     
	  console.log(page)
	  page.click('.peer-connection-dump-root button');
      page.waitFor(20000);
	  //console.log('ttt');
      gatherClientInfoToBack();  
	 },50000)
	 
	   
})();






function gatherClientInfoToBack(){
	const fs = require("fs");
	const os = require('os');
	var homedir = os.homedir();
	var downloadDir = homedir+'/Downloads';
	fs.stat(downloadDir, function (err, stats) {
         console.log(stats.isDirectory());         //true 
    })
	let data = fs.readFileSync(downloadDir+'/webrtc_internals_dump.txt','utf-8');
	console.log(data);
	fs.unlink(downloadDir+'/webrtc_internals_dump.txt',function(err){
		if (err) {
            return console.error(err);
         }
            console.log("文件删除成功！");
	});
}

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
	    console.log(netInfo);    
        ip = netInfo.wlp1s0[0].address;
    }

    return ip;
}

