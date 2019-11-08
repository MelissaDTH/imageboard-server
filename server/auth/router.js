const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require('../../user/model')
const bcrypt = require('bcrypt')
const auth = require('./middleware')

const router = new Router();

// can also do it like this:
// const email = req.body.email
//   const password = req.body.password
//   if (!email || !password) { ... }
router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Please supply a valid email and password"
    });
  } else {
    User.findOne({
      where: { email: req.body.email }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "That email does not exist"
          });
        } else if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          res.status(400).send({
            message: "Password is incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "something went wrong on the server-side"
        });
      });
  }
}); // http :4000/login email=lar@live.nl password=secretword

// When there's a invalid request, the error will 'bubble up' through the app till something 'catches' it. Here, Express contains a catch somewhere and throws a generic error. We want to handle the error ourselves, so we should catch:
router.get('/secret-endpoint', auth, (req, res) => {
    res.send({
      message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
    })
  })

router.get("/image", (req, res, next) => {
  Image.findAll()
    .then(images => {
      res.send(images);
    })
    .catch(next);
});

module.exports = router;

// router.get("/secret-endpoint", (req, res) => {
//     const auth =
//       req.headers.authorization && req.headers.authorization.split(" ");
//     if (auth && auth[0] === "Bearer" && auth[1]) {
//       try {
//         const data = toData(auth[1]);
//         res.send({
//           message: "Thanks for visiting the secret endpoint.",
//           data
//         });
//       } catch (error) {
//         res.status(400).send({
//           message: `Error ${error.name}: ${error.message}`
//         });
//       }
//     } else {
//       res.status(401).send({
//         message: "Please supply some valid credentials"
//       });
//     }
//   });