const express = require('express');
const url = require("node:url");
const {urlencoded} = require("express");

const app = express()

app.use(express.json())
// app.use(urlencoded({extended:true}))

app.get('/cars', (req,res)=>{
    res.end('hello from get')
})

app.post('/users',(req,res) => {
    res.end('hello from post')
})

app.put('/users',(req,res) => {
    res.end('hello from put')
})

app.patch('/users',(req,res) => {
    res.end('hello from patch')
})

app.delete('/users',(req,res) => {
    res.end('hello from delete')
})


app.listen(3000,()=>{
    console.log('server running on port 3000')
})