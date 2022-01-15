"use strict";
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);
const makeMessage = (type, payload) => {
    const msg = { type, payload };
    return JSON.stringify(msg);
};
socket.addEventListener("open", () => {
    console.log("connected to server.");
});
socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList === null || messageList === void 0 ? void 0 : messageList.append(li);
});
socket.addEventListener("close", () => {
    console.log("disconnected from server.");
});
const handleSubmit = (event) => {
    event.preventDefault();
    const input = messageForm === null || messageForm === void 0 ? void 0 : messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input === null || input === void 0 ? void 0 : input.value));
    input.value = "";
};
const handleNickSubmit = (event) => {
    event.preventDefault();
    const input = nickForm === null || nickForm === void 0 ? void 0 : nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input === null || input === void 0 ? void 0 : input.value));
};
messageForm === null || messageForm === void 0 ? void 0 : messageForm.addEventListener("submit", handleSubmit);
nickForm === null || nickForm === void 0 ? void 0 : nickForm.addEventListener("submit", handleNickSubmit);
//# sourceMappingURL=app.js.map