import dotenv from 'dotenv'
dotenv.config()



export const MAX_NTR=50

export const PROCESS_CMD=Object.freeze({
    KILL_BROWSER:"pkill -f 'chromium|chrome|firefox|webkit'"
})


export const DEVICES=['desktop','mobile']
export const BROWSERS=['chrome', 'firefox','edge','safari']

export const WORKER_CONFIG=Object.freeze({
    INSTANCE:Object.freeze({
        CHROMIUM:'chromium',
        FIREFOX:'firefox',  
        WEBKIT:'webkit'
    })
})