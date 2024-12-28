import { chromium, BrowserContext, Browser, Page } from "playwright"
import { FingerprintGenerator } from "fingerprint-generator"
import { FingerprintInjector } from "fingerprint-injector"
import { BROWSERS, DEVICES } from "../constant"


type ProxyConfig = {
    server: string;
    username?: string;
    password?: string;
  };
  
export interface IBrowserConfig {
    proxy?:ProxyConfig
}

class Thief {
    private context!: BrowserContext
    private browser!: Browser
    constructor() {}

    async build(config: IBrowserConfig) {
        const fingerprintGenerator = new FingerprintGenerator()
        const fingerprintInjector = new FingerprintInjector()
        const browserFingerprintWithHeaders =
            fingerprintGenerator.getFingerprint({
                devices: DEVICES,
                browsers: BROWSERS,
            })
        const { fingerprint } = browserFingerprintWithHeaders
        if (this.browser)
            this.browser = await chromium.connect(
                "ws://localhost:20450/chromium/playwright"
            )
        this.context = await this.browser.newContext({
            proxy:config.proxy,
            viewport: fingerprint.screen,
        })
        await fingerprintInjector.attachFingerprintToPlaywright(
            this.context,
            browserFingerprintWithHeaders
        )
    }
    
    private sleep(seconds:number){
        return new Promise(resolve => setTimeout(resolve, seconds * 1000))
    }
    async run(code:string){
       // init resources
       const $page=await this.context.newPage()
       const $sleep=this.sleep

       const result=await eval(code + "handle()")
       await $page.close()
       return result
    }
}


export default Thief