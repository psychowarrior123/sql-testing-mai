const express = require("express");
const config = require("config");
const { dbconfig } = require("./data/config");
const mysql = require("mysql");
const path = require("path");
const db = require("./models");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tables", require("./routes/tables.routes"));
app.use("/api/tasks", require("./routes/tasks.routes"));
app.use("/api/test", require("./routes/test.routes"));
app.use("/api/marks", require("./routes/mark.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

let connection;

const handleDisconnect = () => {
  connection = mysql.createConnection(dbconfig); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect((err) => {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else {
      console.log("Connected!");
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", (err) => {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else if (err.code === "ER_USER_LIMIT_REACHED") {
      handleDisconnect();
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
};

async function start() {
  try {
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
    handleDisconnect();
    db.sequelize.sync();
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
