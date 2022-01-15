"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const app = (0, express_1.default)();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express_1.default.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const server = http_1.default.createServer(app);
class WebSocketObj extends ws_1.default {
}
const sockets = [];
const wss = new ws_1.default.Server({ server });
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("connected to browser.");
    socket.on("close", () => console.log("disconnected from browser"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg.toString("utf8"));
        switch (message.type) {
            case "new_message":
                sockets.forEach((eachSocket) => eachSocket.send(`${socket.nickname}: ${message.payload}`));
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                break;
        }
    });
});
server.listen(3000, () => {
    console.log("http://localhost:3000");
});
//# sourceMappingURL=index.js.map