const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const { stringify } = require('querystring')
const port = 3019

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/students');
const db =mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    name : String,
    email: String,
    subject :String,
    message :String,
})

const users = mongoose.model("data", userSchema)

app.get("/contact.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'contact.html'))
})

app.post("/post",async (req,res)=>{
    const {name,email,subject,message} = req.body
    const user  =new users({
        name,
        email,
        subject,
        message,
    })
    await user.save()
    console.log(user)
    res.send("Form submission successful")
})
app.listen(port,()=>{
    console.log("server started")
})

