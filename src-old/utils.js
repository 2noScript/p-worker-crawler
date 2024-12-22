import cmd from 'node-cmd'

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



