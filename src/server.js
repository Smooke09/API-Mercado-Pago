const {serverHttp} = require("./config/http");
require("./config/websocket")
const PORT = 3333;


serverHttp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
