import Express from "express";
import { configureServer } from "./src";
// import Socket from "./src/app/socket";
import dotenv from "dotenv";
// import Socket from "socket.io";
// import { createServer } from "http";
// import "./types/global.ts"

dotenv.config();
const app = Express();

configureServer(app);

const server = app.listen(process.env.PORT, () => {
  console.log(`Sever Started on port ${process.env.PORT}`);
});

// const socket = Socket(createServer(app)).listen(server);

// socket.on("connect", (c) => {
//   let name = c.id;

//   c.join("looby");

//   c.on("setName", (data) => {
//     name = data;
//   });

//   // c.on("message", (data) => {
//   //   delete c.rooms[c.id];
//   //   // console.log(c.rooms);
//   //   c.emit("response", `${name} said: ${data}`);
//   // });

//   socket.to("looby").emit("response", `${c.id} Joined! Welcome to the looby!`);
//   // socket.to("looby").on("message", (data) => {
//   //   socket.to("looby").emit("response", data);
//   // });

//   c.in("looby").on("message", (data: string) => {
//     c.emit("SYSTEM", `You said ${data}`);
//     c.to("looby").emit("response", `${name} said ${data}`);
//   });

//   // c.in("looby").on("message", (data: string) => {
//   //   // console.log(data);
//   //   c.to("looby").emit("response", `looby ${c.id} ${data}`);
//   // });
// });

// app.

// app.set("SocketIO", socket);
