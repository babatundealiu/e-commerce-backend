import mongoose, { connection } from "mongoose"
const onlineUrl = "mongodb+srv://babjamiu:Dz6BQSUjsR5u7333@cluster0.brpp1g9.mongodb.net/e-commerce"
const LocalUrl= "mongodb://0.0.0.0:27017/e-commerce"

mongoose.connect(onlineUrl).then(()=>{
    console.log("server connected successfully")
}).catch((error:any)=>{
    console.log("an error occured", error)
})
export default mongoose;





