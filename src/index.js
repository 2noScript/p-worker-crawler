import Worker from './worker.js'
import fs from 'fs';


const worker = new Worker()

const filePath = './test/index.js';
const fileContent =  fs.readFileSync(filePath, 'utf8')

await worker.run(fileContent)
await Worker.browserOff()




