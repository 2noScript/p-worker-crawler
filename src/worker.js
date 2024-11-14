import { FingerprintGenerator } from 'fingerprint-generator'
import { FingerprintInjector } from 'fingerprint-injector'
import { chromium } from 'playwright'
import { log } from 'console'
import { PROCESS_CMD } from './constant.js'
import { runCommand ,sleep} from './utils.js'

class Worker {
    static #browser = null
    #context
    constructor() {}

    async #build() {
        const fingerprintGenerator = new FingerprintGenerator()
        const fingerprintInjector = new FingerprintInjector()
        const browserFingerprintWithHeaders =
            fingerprintGenerator.getFingerprint({
                devices: config?.devices || ['desktop'],
                browsers: ['chrome', 'firefox'],
            })
        const { fingerprint } = browserFingerprintWithHeaders
        const options = {
            headless: true,
        }
        await this.#context?.close()
        if (!Worker.#browser) Worker.#browser = await chromium.launch(options)

        this.#context = await browser.newContext({
            // locale: '',
            viewport: fingerprint.screen,
        })
        await fingerprintInjector.attachFingerprintToPlaywright(
            context,
            browserFingerprintWithHeaders
        )
        return this.#context
    }
    static async browserOff() {
        await Worker.#browser?.close()
        await runCommand(PROCESS_CMD.KILL_BROWSER)
        await sleep(5)
        console.log('clean browser')
    }
}
