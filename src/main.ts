import express, {Request,Response} from "express"
import * as mongoose from "mongoose";
import {userService} from "./services/user.service";
import {IUserDTO} from "./interfaces/user.interface";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/users",async (req:Request,res:Response)=>{
    const data = await userService.getAll()
    res.json(data)
})

app.post("/users",async (req:Request,res:Response)=>{
    const user = req.body as IUserDTO
    const data = await userService.create(user)
    res.json(data)
})
app.get("/users/:id",async (req:Request,res:Response)=>{
    const {id} = req.params
    const data = await userService.getById(id)
    res.json(data)
})

const dbConnection =  async () => {
    let dbCon = false

    while(!dbCon){
        try{
            console.log("Connecting to DB...")
            await mongoose.connect('mongodb+srv://admin:admin@nodejs-lessons-cluster.4aylm.mongodb.net/nodejs-express-mongo-db')
            dbCon = true
            console.log("Data Base available!")
        }catch (e){
            console.log("Data Base unavailable, wait 3 sec")
            await new Promise(resolve => setTimeout(resolve,3000))
        }
    }
}

const start = async ()=>{
    try{
        await dbConnection()
        app.listen(2222,()=>{
            console.log("Server listening on 2222")
        })
    }catch(e){
        console.log(e)
    }
}

start()