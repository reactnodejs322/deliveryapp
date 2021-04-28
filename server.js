const express = require("express");
const compression = require("compression");
const cors = require("cors");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const port = process.env.PORT || 3001;
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:1000"],
    credentials: true,
  },
});
const mongoose = require("mongoose");
//hello
//stupid heroku https://stackoverflow.com/questions/26595874/i-want-make-push-and-get-error-src-refspec-master-does-not-match-any
app.use(compression());
app.use(cors());
mongoose
  .connect(process.env.mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

require("./startup/routes")(app);
require("./startup/socket")(io);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

server.listen(port, () => {
  console.log("info", "server mode: " + port);
});

module.exports = server;
