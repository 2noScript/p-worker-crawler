
async function handler() {
    await page.goto('https://nettruyenww.com/?page=3'); 
    const title =await page.title()
    console.log(title)
    await sleep(4)
    return title
}