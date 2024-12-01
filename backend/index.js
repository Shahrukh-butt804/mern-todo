import connectDB from "./dbconfig/dbconfig.js";
import app from "./app.js"

(async function(){
    try {
      await connectDB()

      app.on("error",(err)=>{
        console.log(err)
        process.exit(1)
      })

      app.listen(process.env.PORT,()=>{
        console.log("server is running on",process.env.PORT)
    })

    } catch (error) {
        console.log("mongoDb connection failed",error)
        process.exit(1)
    }
})()