import axios from 'axios'
import cmd from 'node-cmd'


export async function getRawHandle(url) {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (err) {
        console.error('url', err)
        return ''
    }
}

export async function generateTask(configUrl) {
    try {
        const res = await axios.get(configUrl)
        const { info, tasks, baseUrl } = res.data
        const handlers = {}

        for (const task of tasks) {
            handlers[task] = await getRawHandle(`${baseUrl}/${task}.js`)
        }
        return {
            info,
            handlers,
        }
    } catch (err) {
        console.error(err)
        return null
    }
}



// export async function worker(handlerCode) {
//     const _browser = await getBrowser()
//     const page = await _browser.newPage()
//     store.pageCount += 1

//     const result = await eval(handlerCode + 'handler()')
//     await page.close()
//     store.pageCount -= 1
//     return result
// }


export function runCommand(command) {
    return new Promise((resolve, reject) => {
        const result = cmd.runSync(command)
        if (result.err) {
            reject(result.err)
        } else {
            resolve(result)
        }
    })
}
