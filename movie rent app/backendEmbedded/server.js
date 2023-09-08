const express = require("express");
const cors = require("cors");

const connectDb = require("./config/database.js");
const userController = require("./controllers/userController.js");
const movieController = require("./controllers/movieController.js");
const indexController = require("./controllers/indexController.js");
const orderController = require("./controllers/orderController.js");

connectDb();
const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/users", userController);
server.use("/api/movies", movieController);
server.use("/api/index", indexController);
server.use("/api/orders", orderController);

server.listen(3000, () => {
  console.log("server is listening to port 3000");
});
