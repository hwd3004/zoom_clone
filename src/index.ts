import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

// console.log(__dirname);

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

// app.listen(3000, () => {
//   console.log("http://localhost:3000");
// });

const server = http.createServer(app);

class WebSocketObj extends WebSocket {
  nickname: String;
}

// 페이크 데이터베이스
const sockets: WebSocketObj[] = [];

const wss = new WebSocket.Server({ server });

wss.on("connection", (socket: WebSocketObj) => {
  sockets.push(socket); // 여러 브라우저(사용자)를 연결시키기 위해 추가

  socket["nickname"] = "Anon";

  //   console.log(socket);
  console.log("connected to browser.");

  socket.on("close", () => console.log("disconnected from browser"));

  //   socket.on("message", (message) => console.log(message.toString("utf8")));
  //
  //   socket.on("message", (message) => {
  //     socket.send(message.toString("utf8"));
  //   });
  //
  socket.on("message", (msg) => {
    interface Message extends Object {
      type: String;
      payload: String;
    }

    const message: Message = JSON.parse(msg.toString("utf8"));

    switch (message.type) {
      case "new_message":
        sockets.forEach((eachSocket) => eachSocket.send(`${socket.nickname}: ${message.payload}`));
        break;
      case "nickname":
        // socket의 타입은 object
        socket["nickname"] = message.payload;
        break;
    }
  });

  //   socket.send("hello");
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
