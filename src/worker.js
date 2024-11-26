import { FingerprintGenerator } from 'fingerprint-generator'
import { FingerprintInjector } from 'fingerprint-injector'
import { chromium ,firefox,webkit} from 'playwright'
import { PROCESS_CMD ,DEVICES,BROWSERS,WORKER_CONFIG} from './constant.js'
import { runCommand } from './utils.js'

class Worker {
    static #browser = null
    #context
    constructor() {}

    async #getInstance(instanceType){
        const options = {
            headless: false,
        }
        switch(instanceType){
            case WORKER_CONFIG.INSTANCE.CHROMIUM:
                return chromium.launch(options)
            case WORKER_CONFIG.INSTANCE.FIREFOX:
                return firefox.launch(options)
            case WORKER_CONFIG.INSTANCE.WEBKIT:
                return webkit.launch(options)
            default :
                return chromium.launch(options)
        }
    }
    
    async #build(config) {
        const fingerprintGenerator = new FingerprintGenerator()
        const fingerprintInjector = new FingerprintInjector()
        const browserFingerprintWithHeaders =
            fingerprintGenerator.getFingerprint({
                devices:  DEVICES,
                browsers: BROWSERS,
            })
        const { fingerprint } = browserFingerprintWithHeaders

        if (!Worker.#browser) Worker.#browser = await this.#getInstance(config?.instance)

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