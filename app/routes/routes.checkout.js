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

});

module.exports = router;