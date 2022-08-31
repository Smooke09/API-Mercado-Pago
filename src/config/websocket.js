const { io } = require("./http");

// toda vez que o cliente se conectar a nossa aplicacao ele gerar um socket para ele
/* io.on("connection", (socket) => {
  console.log("socket payment ID global", socket.id);
}); */

/*    socket.emit("payment", {
      message: "Pagamento realizado com sucesso",
    });


  socket.on("payment", (data) => {
    socket.join(data);
    console.log(`User with ID ${socket.id} joined the room ${data}`);
  });
 */
/*  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});
 */
