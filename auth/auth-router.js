const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./auth-model.js");
const restricted = require("./../middleware");

const router = express.Router();

router.post("/register", (req, res) => {
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  Users.add({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user) {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Logged in` });
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
