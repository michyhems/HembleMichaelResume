require("dotenv").config();
const PORT = process.env.SERVER_CONTAINER_PORT;
const app = require("./app");

app.listen(PORT, () =>
    console.log(`Server has started and listening on port ${PORT}`),
);
