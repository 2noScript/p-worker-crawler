import dotenv from 'dotenv'
dotenv.config()



export const PORT=process.env.PORT||3000
export const MAX_NTR=50

export const PROCESS_CMD=Object.freeze({
    KILL_BROWSER:"pkill -f 'chromium|chrome|firefox|webkit'"
})
