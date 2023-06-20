import http from "http";
import express from "express";
import { Server } from "socket.io";
import setSockets from "./src/socket.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import "./src/database.js";

// middlewares
import loadUser from "./src/middleware/loadUser.js";
// import requiresAuth from "./src/middleware/requiresAuth.js";

// // routes
import usersRouter from "./src/routes/users.js";
import roomsRouter from "./src/routes/rooms.js";

export const app = express();

const port = 3000;

dotenv.config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", {
    name: "indexx",
  });
});

const server = http.createServer(app);
const io = new Server(server);

app.use(loadUser);
app.use(usersRouter(io));
app.use(roomsRouter(io));
app.use((req, res, next) => {
  next();
});

// 404
// app.use("*", (req, res) => {
//   return res.status(404).json({
//     success: false,
//     message: "404 :c",
//   });
// });

setSockets(io);

server.listen(port);
server.on("listening", () => {
  console.log(`Listening ${port}`);
});
