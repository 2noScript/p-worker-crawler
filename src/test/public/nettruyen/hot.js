
async function handler(page) {
    await page.goto('https://nettruyenww.com/?page=3'); 
    const tile =await page.tile()
    return tile
}

handler(page)