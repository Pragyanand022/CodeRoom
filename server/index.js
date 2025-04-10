import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http';
import cors from 'cors';

const app = express();
const port = 3000;

const server = createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials: true,
    }
});

io.on("connection",(socket)=>{
    console.log("connected", socket.id);
})

app.get('/',(req,res)=>{
    res.send('welcome')
})

server.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
});