import express from "express"
import * as mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routers/api.router";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/',apiRouter)


const dbConnection = async () => {
    let dbCon = false

    while (!dbCon) {
        try {
            console.log("Connecting to DB...")
            await mongoose.connect(config.MONGO_URI)
            dbCon = true
            console.log("Data Base available!")
        } catch (e) {
            console.log("Data Base unavailable, wait 3 sec")
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}

const start = async () => {
    try {
        await dbConnection()
        app.listen(config.PORT, () => {
            console.log(`Server listening on ${config.PORT}`)
        })
    } catch (e) {
        console.log(e)
    }

}

start()