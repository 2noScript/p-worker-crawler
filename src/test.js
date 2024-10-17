import axios from "axios"

import {getBrowser} from './utils.js'


async function test() {
    const browser = await getBrowser()
    const page = await browser.newPage();
    
      try{
        const res=await  axios.get("http://localhost:4000/public/hello.js")
        await eval(res.data)
      }
      catch (err){
        console.error(err)
      }
}

test()