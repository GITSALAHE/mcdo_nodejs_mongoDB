const router = require("express").Router();
let Supp = require("../models/model.supp");

router.route("/").get((req, res) => {
  Supp.find()
    .then((supp) => res.json(supp))
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
    const nomSupp = req.body.nomSupp;
    const imagePath = req.body.imagePath;
    const prix = req.body.prix;
    const pointFid = calcPoint(req.body.prix);
  const suppPush = new Supp({
    nomSupp,
    imagePath,
    prix,
    pointFid
  });

  suppPush
    .save()
    .then(() => res.json("Supplement successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/:id").get((req, res) => {
  Supp.findById(req.params.id)
    .then((supp) => res.json(supp))
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
