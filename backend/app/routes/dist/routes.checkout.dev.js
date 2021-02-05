"use strict";

var router = require("express").Router();

var QRCode = require('qrcode');

var path = require('path');

var _require = require('uuidv4'),
    uuid = _require.uuid;

var menu = require("../models/model.menu");

var SousMenu = require("../models/model.sousmenu");

var supp = require('../models/model.supp');

router.route("/cc").post(function (req, res) {});
router.route("/table").post(function (req, res) {
  if (req.body.q1 !== '' && req.body.point1 !== '' || req.body.q2 !== '' && req.body.point2 !== '' || req.body.q3 !== '' && req.body.point3) {
    var pointTotal = req.body.q1 * req.body.point1 + req.body.q2 * req.body.point2 + req.body.q3 * req.body.point3;
  }

  var data = "Votre point de fidilte est: " + pointTotal;
  var fileName = './qrimage/qr' + uuid() + '.png';
  QRCode.toFile(fileName, data, function (err, file) {
    var qrFile = path.join(__dirname, '../../' + fileName);
    res.sendFile(qrFile);
  });
});
module.exports = router;