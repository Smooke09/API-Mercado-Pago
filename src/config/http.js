const express = require("express");
const app = express();
const routes = require("../routes");
const { Server } = require("socket.io");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const bodyParser = require("body-parser");
const cors = require("cors");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});



app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = { server, io };
