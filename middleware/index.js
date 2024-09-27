var bcrypt = require("bcryptjs");
const Users = require("../auth/auth-model");

module.exports = (req, res, next) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user) {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};
