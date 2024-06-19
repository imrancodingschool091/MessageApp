import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { databaseConnection } from "./DB/connection.js"
import Router from "./Routes/user.route.js"



const app=express()
dotenv.config()


//middleware

app.use(express.json())
app.use(cors())


const PORT=process.env.PORT ||8080

databaseConnection()

//Routes

app.use("/user",Router)




app.listen(PORT,()=>{

    console.log(`the app is listning on port :${PORT}`)
})