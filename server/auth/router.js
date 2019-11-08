const { Router } = require('express')
const { toJWT, toData } = require('./jwt')

const router = new Router()

router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: 'Please supply a valid email and password'
          })
    } else {
        res.send({
            jwt: toJWT({ userId: 1 })
          })
    }
})


router.get("/image", (req, res, next) => {
    Image.findAll()
      .then(images => {
        res.send(images);
      })
      .catch(next);
  });

module.exports = router