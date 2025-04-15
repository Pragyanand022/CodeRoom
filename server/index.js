import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import ACTIONS from './utils/Actions.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT||3000;

const server = createServer(app);
const clientURL = process.env.ORIGIN || "http://localhost:5173" ;

const languageConfig = {
    python3: { versionIndex: '3' },
    java: { versionIndex: '3' },
    cpp: { versionIndex: '4' },
    nodejs: { versionIndex: '3' },
    c: { versionIndex: '4' },
    ruby: { versionIndex: '3' },
    go: { versionIndex: '3' },
    scala: { versionIndex: '3' },
    bash: { versionIndex: '3' },
    sql: { versionIndex: '3' },
    pascal: { versionIndex: '2' },
    csharp: { versionIndex: '3' },
    php: { versionIndex: '3' },
    swift: { versionIndex: '3' },
    rust: { versionIndex: '3' },
    r: { versionIndex: '3' },
};

app.use(cors({
    origin: clientURL,
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: clientURL,
        methods: ["GET", "POST"],
        credentials: true,
    }
});

const userSocketMap = {};
const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
};

io.on("connection", (socket) => {
    console.log("connected", socket.id);
    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);

        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.MSG, ({data, roomId})=>{   
        console.log(data.text, roomId);
        io.to(roomId).emit(ACTIONS.MSG_LISTENER,(data));

    })

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });

        delete userSocketMap[socket.id];
        socket.leave();
    });
})

app.post('/compile', async (req, res) => {
    const { code, language } = req.body;
    console.log(code,language);

    try {
        const response = await axios.post('https://api.jdoodle.com/v1/execute', {
            script: code,
            language: language,
            versionIndex: languageConfig[language].versionIndex,
            clientId: process.env.jDoodle_clientId,
            clientSecret: process.env.jDoodle_clientSecret,
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to compile code' });
    }
});

app.get('/',(req,res)=>{
    res.send('server is listening');
})
app.get('/ping',(req,res)=>{
    res.send('connented');
})

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});