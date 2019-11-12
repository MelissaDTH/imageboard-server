const { Router } = require("express");
const Image = require("./model");
const auth = require('../server/auth/middleware')

const router = new Router();

router.get("/image", (req, res, next) => {
    Image.findAll()
      .then(images => {
        res.send(images);
      })
      .catch(next);
  });
  
  router.post("/image", auth, (req, res, next) => {
    Image.create(req.body) //sequelize will use this to populate row's fields
      .then(image => res.json(image))
      .catch(next);
  });
  
module.exports = router