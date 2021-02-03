const router = require("express").Router();
let SousMenu = require("../models/model.sousmenu");

router.route("/").get((req, res) => {
  SousMenu.find()
    .then((sousmenu) => res.json(sousmenu))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post((req, res) => {
  const calcPoint = (prix) => {
    if(prix <= 20 && prix >= 7){
        prix = ((prix / 2) * 10) + 5
    }
    else if(prix <= 49 && prix >= 21){
      prix = ((prix / 2) * 10) + 12
    }
    else if(prix >= 50){
      prix = ((prix / 2) * 10) + 20
    }
    return prix;
};
    const nomSousMenu = req.body.nomSousMenu;
    const imagePath = req.body.imagePath;
    const idMenu = req.body.idMenu
    const prix = req.body.prix;
    const pointFid = calcPoint(req.body.prix);
  const menuPush = new SousMenu({
    nomSousMenu,
    imagePath,
    idMenu, 
    prix, 
    pointFid
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
