import express, { urlencoded } from "express"
const app = express()

import cors from "cors"

const corsOptions = {
    origin:"http://localhost:3000",
    methods : ["GET","POST","PATCH","DELETE"]
}


app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors(corsOptions))

import todoRoute from "./routes/todoRoutes.js"
// ALL TODO ROUTES
app.use("/api/v1/todo",todoRoute)

import userRoute from "./routes/userRoute.js"
// ALL USER ROUTES
app.use("/api/v1/user",userRoute)


export default app