const { server } = require("./config/http");
require("./config/websocket");
const PORT = 3333;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
