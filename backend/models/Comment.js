class Comment {
  constructor(id, message, author, createdAt) {
    this.id = id;
    this.message = message;
    this.author = author;
    this.createdAt = createdAt;
  }
}

module.exports = Comment;

// Ten kod tworzy klasę Comment z czterema polami: id, message, author i createdAt. W ten sposób będziemy przechowywać i przesyłać informacje o komentarzach między backendem a frontendem.
