import { chromium } from 'playwright';

function sleep(ms:any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


(async () => {
  console.log("** Đang kết nối tới WebSocket...");
  const browser = await chromium.connect(
    'ws://localhost:20450/chromium/playwright',
    
  );
  console.log("Kết nối thành công đến trình duyệt!");
  const page = await browser.newPage();
  
  await page.goto('https://fastscans5.net/',{waitUntil:'networkidle'});
  
  // await sleep(12000)
  const title = await page.title();
  

  console.log('Title of the page:', title);
  

  await page.screenshot({ path: 'example.png' });


  await browser.close();
})();
