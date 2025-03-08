const express = require('express');
const {urlencoded} = require("express");
const {userService} = require("./services/userService");

const app = express()

app.use(express.json())
app.use(urlencoded({extended:true}))

app.get('/users', async (req, res) => {
    const data = await userService.getAll()
    return res.json(data)
})

app.post('/users', async (req, res) => {
    const user = req.body
    const data = await userService.create(user)
    res.json(data)
})

app.get('/users/:id', async (req,res)=>{
    const id = req.params.id
    const data = await userService.getById(id)
    return res.json(data)
})

app.patch('/users/:id', async (req,res)=>{
    const id = req.params.id
    const query = req.query
    const data = await userService.update(id,query)
    console.log(query)
    return res.json(data)
})

app.delete('/users/',async (req,res)=>{
    const data = await userService.deleteAll()
    return res.json(data - 'DELETED')
})

app.delete('/users/:id',async (req,res)=>{
    const id = req.params.id
    const data = await userService.deleteById(id)
    return res.json(data)
})
app.listen(3000, () => {
    console.log('server running on port 3000')
})