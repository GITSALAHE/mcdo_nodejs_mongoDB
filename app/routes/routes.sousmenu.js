const router = require("express").Router();
let SousMenu = require("../models/model.sousmenu");

router.route("/").get((req, res) => {
  SousMenu.find()
    .then((sousmenu) => res.json(sousmenu))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post((req, res) => {
    const nomSousMenu = req.body.nomSousMenu;
    const imagePath = req.body.imagePath;
    const idMenu = req.body.idMenu
  const menuPush = new SousMenu({
    nomSousMenu,
    imagePath,
    idMenu
  });

  menuPush
    .save()
    .then(() => res.json("Sous Menu successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/:id").get((req, res) => {
  SousMenu.findById(req.params.id)
    .then((sousmenu) => res.json(sousmenu))
    .catch((err) => res.status(400).json("Error :" + err));
});



module.exports = router;
