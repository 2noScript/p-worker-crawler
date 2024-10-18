import { getBrowser ,generateTask ,worker} from './utils.js'



async function bootApp(){
  const {info,handlers}=await generateTask("http://localhost:4000/nettruyen/config.json")
  for (const handleName in handlers){
    const result=await worker(handlers[handleName])
  }
}

bootApp()