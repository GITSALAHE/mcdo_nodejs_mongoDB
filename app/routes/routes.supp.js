const router = require("express").Router();
let Supp = require("../models/model.supp");

router.route("/").get((req, res) => {
  Supp.find()
    .then((supp) => res.json(supp))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post((req, res) => {
    const nomSupp = req.body.nomSupp;
    const imagePath = req.body.imagePath;
  const suppPush = new Supp({
    nomSupp,
    imagePath
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
