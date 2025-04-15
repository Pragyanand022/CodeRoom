import { io } from "socket.io-client";

const socketURI = import.meta.env.VITE_CORS_ORIGIN || 'http://localhost:3000';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
        transports: ['websocket'],
        withCredentials: true,
    };
    return io(socketURI, options);
}