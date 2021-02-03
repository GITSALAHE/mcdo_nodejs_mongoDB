const router = require("express").Router();
let Menu = require("../models/model.menu");

router.route("/").get((req, res) => {
  Menu.find()
    .then((menu) => res.json(menu))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post((req, res) => {
  const nomMenu = req.body.nomMenu; 
  const imagePath  = req.body.imagePath;
  const menuPush = new Menu({
   nomMenu,
   imagePath
  });

  menuPush
    .save()
    .then(() => res.json("Menu successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/:id").get((req, res) => {
  Menu.findById(req.params.id)
    .then((menu) => res.json(menu))
    .catch((err) => res.status(400).json("Error :" + err));
});



module.exports = router;
