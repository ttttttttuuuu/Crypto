const express = require("express");

const router = express.Router();

const users = [];

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filters((user) => user.id !== id);
  res.send(`User with the id ${id} deleted from the database`);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const user = users.find((user) => user.id === id);
  if (username) {
    user.username = username;
  }
  if (password) {
    user.password = password;
  }
});
