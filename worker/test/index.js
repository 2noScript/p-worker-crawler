async function handler() {
    await page.goto('https://browserleaks.com/ip')
    const title = await page.title();
    await page.mouse.wheel(0, 1000)
    await sleep(5)
    await  page.mouse.wheel(0, -100)
    console.log(title)
    await sleep(60)
    return title
}