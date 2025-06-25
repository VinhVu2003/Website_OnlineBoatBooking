import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Khai báo URL ở đây

export const connectSocket = () => {
    const socket = io(SOCKET_URL); // Sử dụng URL đã khai báo
    socket.on('connect', () => {
        console.log("Kết nối socket thành công!");
    });
    return socket;
};
