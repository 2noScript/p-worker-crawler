import axios from 'axios'
import { chromium } from 'playwright'

const store={
    browser:null,
    working:{},
    pageCount:0
}






export function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

export async function getBrowser(params = {}) {
    if (!store.browser) {
        store.browser = await chromium.launch({
            headless: false,
            args: [
                '--disable-webrtc',
                '--disable-rtc-smoothness-algorithm',
                '--disable-rtc-probe',
                '--disable-rtc-smoothness',
            ],
            ...params,
        })
    }
    return store.browser
}

export async function getRawHandle(url) {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (err) {
        console.error(err)
        return ''
    }
}


export async function generateTask(configUrl) {
    try {
        const res = await axios.get(configUrl)
        const {info,tasks,baseUrl} =res.data
        const handlers={}
        
        for (const task of tasks){
            handlers[task] =await getRawHandle(`${baseUrl}/${task}.js`)
        }
        return {
            info,
            handlers
        }
    } catch (err) {
        console.error(err)
        return null
    }
}


async function worker(task) {
   const _browser=await getBrowser()
   const page =await _browser.newPage()
   store.pageCount+=1

   const result=  eval(task) 
   await page.close()

   store.pageCount-=1
   return result
}



