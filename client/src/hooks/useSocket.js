import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socketURI = import.meta.env.VITE_socket_URI || 'http://localhost:3000';

export const useSocket = ()=>{
    const socketRef = useRef(null);

    useEffect(()=>{
        socketRef.current = io(socketURI, {
            cors:{
                withCredentials: true,
                transports: ['websocket'],
            }
        })

        const socket = socketRef.current;

        socket.on('connect',()=>{
            console.log(socket.id);
        })

        return() =>{
            if(socketRef.current){
                socketRef.current.disconnect();
                console.log('socket disconnected');
            }

        }
    },[]);

    return socketRef.current;
}

