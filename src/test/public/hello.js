
async function handler(page) {
    await page.goto('https://browserleaks.com/webrtc'); 
    await page.goto("https://www.google.com")
}

handler(page)