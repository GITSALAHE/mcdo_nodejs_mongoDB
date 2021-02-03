const router = require("express").Router();
var QRCode = require('qrcode')
var path = require('path')
const { uuid } = require('uuidv4');

let menu = require("../models/model.menu");
let SousMenu = require("../models/model.sousmenu");
let supp = require('../models/model.supp');

router.route("/cc").post((req, res) => {

});

router.route("/table").post((req, res) => {
      
      var data = "Votre point de fidilte est: "+ 150;  
      var fileName = 'qr'+uuid()+'.png';
      QRCode.toFile(fileName, data, function(err, file){
      var qrFile = path.join(__dirname, '../../'+fileName);
      res.sendFile(qrFile)
  });
});

module.exports = router;