import { getBrowser ,generateTask} from './utils.js'



generateTask("http://localhost:4000/public/nettruyen/config.json").then(data=>console.log(data))