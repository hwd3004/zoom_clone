const messageList: HTMLUListElement | null = document.querySelector("ul");
const messageForm: HTMLFormElement | null = document.querySelector("#message");
const nickForm: HTMLFormElement | null = document.querySelector("#nick");

// const socket = new WebSocket("ws://localhost:3000");
const socket = new WebSocket(`ws://${window.location.host}`);
// app.js의 socket은 서버로의 연결을 뜻한다

const makeMessage = (type: String, payload: String | undefined) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

socket.addEventListener("open", () => {
  console.log("connected to server.");
});

socket.addEventListener("message", (message) => {
  //   console.log("new message: ", message.data);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList?.append(li);
});

socket.addEventListener("close", () => {
  console.log("disconnected from server.");
});

// setTimeout(() => {
//   socket.send("hello from the browser");
// }, 3000);

const handleSubmit = (event: Event) => {
  event.preventDefault();
  const input: HTMLInputElement | null | undefined = messageForm?.querySelector("input");
  //   socket.send(input?.value); // 백엔드로 메세지 보내기
  socket.send(makeMessage("new_message", input?.value));
  input.value = "";
  //   console.log(input?.value);
};

const handleNickSubmit = (event: Event) => {
  event.preventDefault();
  const input: HTMLInputElement | null | undefined = nickForm?.querySelector("input");
  //   socket.send(input?.value);
  //
  // socket.send({
  //   type: "nickname",
  //   payload: input.value,
  // });
  socket.send(makeMessage("nickname", input?.value));
};

messageForm?.addEventListener("submit", handleSubmit);
nickForm?.addEventListener("submit", handleNickSubmit);
