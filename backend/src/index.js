import app from './app.js';
import cluster from "node:cluster";
import os from 'node:os';

app.get('/',(req,res)=>{
    res.json({message:"successfull"})
})

const cpu=os.cpus.length;
if(cluster.isPrimary){
    console.log("Primary process running on :", process.pid)
    for(let i=0; i<cpu;i++){
       const worker= cluster.fork()
        console.log(`Worker is running on Pid : ${worker.pid}`)
    }

}else{
    app.listen(8080,()=>{
        console.log("Server is running on port : 8080")
    })
}
