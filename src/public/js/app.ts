import { io, Socket } from "socket.io-client";

// io()은 자동으로 socket.io를 실행하고 있는 서버를 찾음
const socket: Socket = io();
//asds