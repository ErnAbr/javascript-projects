const express = require("express");
const cors = require("cors");
const blogController = require("./controllers/blogController.js");

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger);
server.use("/blogs", blogController);

function logger(req, res, next) {
  console.time("response has been sent, it took");
  console.log(
    `request has been received at ${req.originalUrl}, the method was ${req.method}`
  );
  next();
  console.timeEnd("response has been sent, it took");
}

server.listen(3000, () => {
  console.log("server is listening to port 3000");
});
