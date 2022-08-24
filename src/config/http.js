const express = require("express");
const http = require("http");
const routes = require("../routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io")
 
const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp)

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/ee", (req, res) => {
    res.send("Hello World");
})

module.exports = {serverHttp, io}; 
