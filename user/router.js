const { Router } = require("express");
const User = require("./model");
const bcrypt = require('bcrypt')

const router = new Router();
  
// at this endpoint: people can sign up
  router.post("/user", (req, res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    User.create(user) // using the user function here in order to bcrypt only the password
      .then(user => res.json(user))
      .catch(next);
  });
  
module.exports = router