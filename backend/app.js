const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");

const commentsRouter = require("./routes/comments");

const app = express();

// Konfiguracja middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Konfiguracja endpointów API
app.use("/comments", commentsRouter);

// Inicjalizacja połączenia z bazą danych MySQL
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "comment_db",
    });
    console.log("Connected to database!");
    return connection;
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}

connectToDatabase();

// Start serwera
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
