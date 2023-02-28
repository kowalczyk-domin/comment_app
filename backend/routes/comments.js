const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const Comment = require("../models/Comment");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// CREATE
router.post("/", (req, res) => {
  const comment = new Comment(
    null,
    req.body.message,
    req.body.author,
    new Date()
  );
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "comment_db",
  });

  connection.connect();

  const query = `INSERT INTO comments (message, author, createdAt) VALUES (?, ?, ?)`;
  connection.query(
    query,
    [comment.message, comment.author, comment.createdAt],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      comment.id = results.insertId;
      res.status(201).json(comment);
    }
  );

  connection.end();
});

// READ
router.get("/", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "comment_db",
  });

  connection.connect();

  const query = `SELECT * FROM comments`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const comments = results.map((result) => {
      return new Comment(
        result.id,
        result.message,
        result.author,
        result.createdAt
      );
    });

    res.status(200).json(comments);
  });

  connection.end();
});

module.exports = router;

// Ten kod tworzy dwa endpointy: POST /comments oraz GET /comments. Pierwszy pozwala na zapisanie nowego komentarza, a drugi pobiera listę wszystkich komentarzy.
