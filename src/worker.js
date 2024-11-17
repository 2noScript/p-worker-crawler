import { FingerprintGenerator } from 'fingerprint-generator'
import { FingerprintInjector } from 'fingerprint-injector'
import { chromium } from 'playwright'
import { PROCESS_CMD } from './constant.js'
import { runCommand } from './utils.js'

class Worker {
    static #browser = null
    #context
    constructor() {}

    async #build(config) {
        const fingerprintGenerator = new FingerprintGenerator()
        const fingerprintInjector = new FingerprintInjector()
        const browserFingerprintWithHeaders =
            fingerprintGenerator.getFingerprint({
                devices:  ['desktop','mobile'],
                browsers: ['chrome', 'firefox'],
            })
        const { fingerprint } = browserFingerprintWithHeaders
        const options = {
            headless: false,
        }
        await this.#context?.close()
        if (!Worker.#browser) Worker.#browser = await chromium.launch(options)

        this.#context = await Worker.#browser.newContext({
            ...(config?.proxy ? { proxy: config.proxy } : {}),
            viewport: fingerprint.screen,
        })
        await fingerprintInjector.attachFingerprintToPlaywright(
            this.#context,
            browserFingerprintWithHeaders
        )
    }

    #sleep(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000))
    }
    static async browserOff() {
        await Worker.#browser?.close()
        Worker.#browser=null
        await runCommand(PROCESS_CMD.KILL_BROWSER)
        console.log('clean browser')
    }
    async run(handlerCode){
      if (!this.#context) await this.#build()
      //resources
      const page =await this.#context.newPage()
      const sleep=this.#sleep
    
      const result=await  eval(handlerCode + 'handler()')
      await page.close()
      return result
    }
}

export default Worker