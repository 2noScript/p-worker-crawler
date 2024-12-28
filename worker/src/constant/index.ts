import dotenv from "dotenv"
import { BrowserType, DeviceType } from "../models"
dotenv.config()

export const MAX_NTR = 50

export const PROCESS_CMD = Object.freeze({
    KILL_BROWSER: "pkill -f 'chromium|chrome|firefox|webkit'",
})

export const DEVICES:DeviceType[] = ["desktop", "mobile"]
export const BROWSERS:BrowserType[] = ["chrome", "firefox", "edge", "safari"]

export const WORKER_CONFIG = Object.freeze({
    INSTANCE: Object.freeze({
        CHROMIUM: "chromium",
        FIREFOX: "firefox",
        WEBKIT: "webkit",
    }),
})
