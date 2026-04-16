require("dotenv").config();
const PORT = process.env.SERVER_CONTAINER_PORT;
const app = require("./app");
const db = require("./config/DBconnection");
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));
app.listen(PORT, () =>
    console.log(`Server has started and listening on port ${PORT}`),
);
