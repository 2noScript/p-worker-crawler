import axios from "axios"
import { chromium } from 'playwright'


async function test() {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    
      try{
        const res=await  axios.get("http://localhost:4000/public/hello.js")
        await eval(res.data)
      }
      catch (err){
        console.error(err)
      }
}

test()