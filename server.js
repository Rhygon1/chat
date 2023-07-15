const express = require("express");
const app = express()
const http = require('http');
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Message = require('./modules/messages')
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb+srv://Dhruv:gilbert130@cluster0.rcpc7.mongodb.net/Chat?retryWrites=true&w=majority')
    .then((result)=>{
        server.listen(port, ()=>{
            console.log("Started listening")
        })
    })
    .catch(err=>{
        console.log(err.message)
    })

let b = [];
let users = {};

io.on("connection", (socket)=>{
    let a=[]
    Message.find()
        .then((results)=>{
            results.forEach(mes=>{
                const new1 = `${mes.name}: ${mes.message}`
                a.push(new1)
            })
            socket.emit("Get", a, b)
        })
        .catch(err =>{
            console.log(err)
        })
    socket.on("Use", name=>{   
        if (name==null){
            socket.emit("Username", "Please input username")
        }
    })
    socket.on("function", user=>{
        if(users[socket.id]!=null && users[socket.id]!=null){
            socket.emit("upd", users[socket.id])
            socket.broadcast.emit("upd", users[socket.id])
            let index = b.indexOf(users[socket.id])
            b.splice(index, 1, )
        }
        socket.emit("Start", user)
        socket.broadcast.emit("Start", user)
        b.push(user)
        users[socket.id]=user
    })
    socket.on("send-message", (message, User)=>{
        socket.broadcast.emit("Add-message", message, User)
        const newMes = new Message({
            name: User,
            message: message
        })
        newMes.save()
    })
    socket.on("disconnect", ()=>{
        socket.emit("delete")
        socket.broadcast.emit("upd", users[socket.id])
        let index = b.indexOf(users[socket.id])
        b.splice(index, 1, )
    })
})

