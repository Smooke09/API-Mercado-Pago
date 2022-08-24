const {io} = require("./http");

// toda vez que o cliente se conectar a nossa aplicacao ele gerar um socket para ele
io.on("connection", socket => {
    console.log("sockeeeeeeeeeeeet",socket.id);
})