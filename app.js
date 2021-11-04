const express = require("express");
const config = require("config");
const { dbconfig } = require("./data/config");
const mysql = require("mysql");
const db = require("./models");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tables", require("./routes/tables.routes"));
app.use("/api/tasks", require("./routes/tasks.routes"));
app.use("/api/test", require("./routes/test.routes"));
app.use("/api/marks", require("./routes/mark.routes"));

const PORT = config.get("port") || 5000;

const connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
});

async function start() {
  try {
    await connection.connect(() => console.log("Connected!"));
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
    db.sequelize.sync();
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
