import express from "express";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const __dirname = dirname(fileURLToPath(import.meta.url));

//this needed to server static files like .css
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

//io.on opens the socket, where socket.on is the receiver respectively on client and server, where io.emit is the sender of data on both sides

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    io.emit("chat message", "user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server is running at PORT:3000");
});
