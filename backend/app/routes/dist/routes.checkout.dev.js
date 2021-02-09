"use strict";

var router = require("express").Router();

var pdf = require('html-pdf');

var QRCode = require('qrcode');

var path = require('path');

var _require = require('uuidv4'),
    uuid = _require.uuid;

var menu = require("../models/model.menu");

var SousMenu = require("../models/model.sousmenu");

var supp = require('../models/model.supp');

var product = require('../models/model.product');

var Coupon = require('../models/model.coupon');

var TableModel = require('../models/model.table');

var stripe = require('stripe')('sk_test_51GxrgnJjT1M3ZAOS81SzgNM4lkcMlMfZv5M9fKRtb0ocwUbMqB6d0Ghy3cw7orfuenCID3P7HYVCUezHQ6WYNQBA00lKofIBf6');

router.route("/cc").post(function _callee2(req, res) {
  var totalAll, objData, i, objDataSupp, couponObj, pointTotal, data, fileNameQr, fileQrName;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          objData = [];
          i = 0;

        case 3:
          if (!(i < req.body.id.length)) {
            _context2.next = 10;
            break;
          }

          if (!(req.body.id[i] !== "")) {
            _context2.next = 7;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(product.findById(req.body.id[i]).then(function (response) {
            objData.push(response);
          }));

        case 7:
          i++;
          _context2.next = 3;
          break;

        case 10:
          objDataSupp = [];
          i = 0;

        case 12:
          if (!(i < req.body.idSupp.length)) {
            _context2.next = 19;
            break;
          }

          if (!(req.body.idSupp[i] !== "")) {
            _context2.next = 16;
            break;
          }

          _context2.next = 16;
          return regeneratorRuntime.awrap(supp.findById(req.body.idSupp[i]).then(function (response) {
            objDataSupp.push(response);
          }));

        case 16:
          i++;
          _context2.next = 12;
          break;

        case 19:
          console.log(objDataSupp);
          couponObj = {};

          if (!(req.body.coupon != undefined || req.body.coupon !== "")) {
            _context2.next = 26;
            break;
          }

          _context2.next = 24;
          return regeneratorRuntime.awrap(Coupon.find({
            code: req.body.coupon,
            valid: "1"
          }).then(function (response) {
            couponObj = response;
          }));

        case 24:
          _context2.next = 26;
          return regeneratorRuntime.awrap(Coupon.updateOne({
            code: req.body.coupon
          }, {
            $set: {
              valid: "0"
            }
          }));

        case 26:
          _context2.next = 28;
          return regeneratorRuntime.awrap(TableModel.updateOne({
            numeroTable: req.body.table
          }, {
            $set: {
              reserve: "1"
            }
          }));

        case 28:
          pointTotal = 0;

          for (i = 0; i < req.body.quantite.length; i++) {
            pointTotal += parseInt(req.body.quantite[i]) * parseInt(req.body.point[i]);
          }

          for (i = 0; i < req.body.quantiteSupp.length; i++) {
            pointTotal += parseInt(req.body.quantiteSupp[i]) * parseInt(req.body.pointSupp[i]);
          }

          data = "Votre point de fidilte est: " + pointTotal;
          fileNameQr = 'qr' + uuid() + '.png';
          fileQrName = './app/qrimg/' + fileNameQr;
          QRCode.toFile(fileQrName, data, function (err, file) {
            var filePdfName = './app/pdf/pdf' + uuid() + '.pdf';
            var options = {
              format: 'A3',
              width: '900px',
              height: '2000px',
              zoomFactor: .5
            };
            var productsPdf = '';
            var totalProducts = 0;

            for (var i = 0; i < objData.length; i++) {
              productsPdf += "\n          <tr>\n          <td> ".concat(objData[i].nomProduct, "</td>\n          <td>").concat(req.body.quantite[i], "</td>\n          <td>").concat(objData[i].prix, " Dhs</td>\n        </tr>\n          ");
              totalProducts += objData[i].prix * req.body.quantite[i];
            }

            var suppPdf = '';
            var totalSupp = 0;

            for (var i = 0; i < objDataSupp.length; i++) {
              suppPdf += "\n      <tr>\n      <td> ".concat(objDataSupp[i].nomSupp, "</td>\n      <td>").concat(req.body.quantiteSupp[i], "</td>\n      <td>").concat(objDataSupp[i].prix, " Dhs</td>\n    </tr>\n      ");
              totalSupp += objDataSupp[i].prix * req.body.quantiteSupp[i];
            }

            totalAll = totalProducts + totalSupp;
            var messageMin = '';

            if (couponObj[0] != undefined && req.body.coupon != '') {
              totalAll = totalAll - totalAll * couponObj[0].percent / 100;
              var messageMin = " Apres code appliquer <b> ".concat(req.body.coupon, " -").concat(couponObj[0].percent, "% </b>");
            }

            var html = "<!DOCTYPE html>\n                <html lang=\"en\">\n                <head>\n                <meta charset=\"UTF-8\">\n                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n                <meta name=\"Description\" content=\"Enter your description here\"/>\n                <!-- Latest compiled and minified CSS -->\n                <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\n\n                <!-- Optional theme -->\n                <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css\" integrity=\"sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp\" crossorigin=\"anonymous\">\n                <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css\">\n                <link rel=\"stylesheet\" href=\"assets/css/style.css\">\n                <title>Title</title>\n                <style>\n  #customers {\n    font-family: Arial, Helvetica, sans-serif;\n    border-collapse: collapse;\n    width: 100%;\n  }\n\n  #customers td, #customers th {\n    border: 1px solid #ddd;\n    padding: 8px;\n  }\n\n  #customers tr:nth-child(even){background-color: #f2f2f2;}\n\n  #customers tr:hover {background-color: #ddd;}\n\n  #customers th {\n    padding-top: 12px;\n    padding-bottom: 12px;\n    text-align: left;\n    background-color: #4CAF50;\n    color: white;\n  }\n\n  #supp {\n    font-family: Arial, Helvetica, sans-serif;\n    border-collapse: collapse;\n    width: 100%;\n  }\n\n  #supp td, #supp th {\n    border: 1px solid #ddd;\n    padding: 8px;\n  }\n\n  #supp tr:nth-child(even){background-color: #f2f2f2;}\n\n  #supp tr:hover {background-color: #ddd;}\n\n  #supp th {\n    padding-top: 12px;\n    padding-bottom: 12px;\n    text-align: left;\n    background-color: #4CAF50;\n    color: white;\n  }\n  </style>\n                </head>\n                <body>\n                    <div class=\"container\">\n                        <h1 class=\"text-center\">Bonjour votre facture Table : ".concat(req.body.table, "</h1>\n                        <h2 class=\"text-center\"> ").concat(req.body.eat, " </h2>\n                    </div>\n                    <div class=\"d-flex justify-content-center\" style=\"margin-left: 46%;\"    >\n                            <img src=\"file:///C:/Users/GITSALAH/Desktop/NodeJs/mcdo/backend/app/qrimg/").concat(fileNameQr, "\" alt=\"\">\n                    </div>\n\n                    <div>\n                    <table id=\"customers\">\n    <tr>\n      <th>Plat choisi</th>\n      <th>Quantite</th>\n      <th>Prix Unitaire</th>\n    </tr>\n  ").concat(productsPdf, "\n\n  <tr>\n    <td style=\"border:none\"></td>\n    <td><b>Total</b></td>\n    <td><b>").concat(totalProducts, " Dhs</b> </td>\n  </tr>\n  </table>\n                    </div>\n                    <div> \n                    <table id=\"customers\">\n                    <tr>\n                      <th>Supplement choisi</th>\n                      <th>Quantite</th>\n                      <th>Prix Unitaire</th>\n                    </tr>\n                  ").concat(suppPdf, "\n                \n                  <tr>\n                    <td style=\"border:none\"></td>\n                    <td><b>Total</b></td>\n                    <td><b>").concat(totalSupp, " Dhs</b> </td>\n                  </tr>\n                  </table>\n\n                      \n                    </div>\n                    <h3 class=\"text-center\"><b>Total facture : ").concat(totalAll, " Dhs</b>").concat(messageMin, "</h3>\n                    <h4>Paiement : Carte credit</h4>\n                <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js\"></script>\n                <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js\"></script>\n                <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\" integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\" crossorigin=\"anonymous\"></script>\n\n                </body>\n                </html>\n           "); // @ts-ignore

            pdf.create(html, options).toFile(filePdfName, function (err, st) {
              res.send("file:///C:/Users/GITSALAH/Desktop/NodeJs/mcdo/backend/".concat(filePdfName));
            });
          });
          _context2.next = 37;
          return regeneratorRuntime.awrap(stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            source: req.body.stripeToken
          }).then(function _callee(customer) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(stripe.charges.create({
                      amount: totalAll * 100,
                      currency: 'mad',
                      customer: customer.id,
                      description: 'Achat McDo de la part Mr/Mme/mlle :' + req.body.name
                    }));

                  case 2:
                    return _context.abrupt("return", _context.sent);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }).then(function () {
            return console.log("stripe success");
          })["catch"](function (err) {
            return console.log(err);
          }));

        case 37:
          _context2.next = 42;
          break;

        case 39:
          _context2.prev = 39;
          _context2.t0 = _context2["catch"](0);
          res.send(_context2.t0);

        case 42:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 39]]);
});
router.route("/table").post(function _callee3(req, res) {
  var objData, i, objDataSupp, couponObj, pointTotal, data, fileNameQr, fileQrName;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          objData = [];
          i = 0;

        case 2:
          if (!(i < req.body.id.length)) {
            _context3.next = 9;
            break;
          }

          if (!(req.body.id[i] !== "")) {
            _context3.next = 6;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(product.findById(req.body.id[i]).then(function (response) {
            objData.push(response);
          }));

        case 6:
          i++;
          _context3.next = 2;
          break;

        case 9:
          objDataSupp = [];
          i = 0;

        case 11:
          if (!(i < req.body.idSupp.length)) {
            _context3.next = 18;
            break;
          }

          if (!(req.body.idSupp[i] !== "")) {
            _context3.next = 15;
            break;
          }

          _context3.next = 15;
          return regeneratorRuntime.awrap(supp.findById(req.body.idSupp[i]).then(function (response) {
            objDataSupp.push(response);
          }));

        case 15:
          i++;
          _context3.next = 11;
          break;

        case 18:
          console.log(objDataSupp);
          couponObj = {};

          if (!(req.body.coupon != undefined || req.body.coupon !== "")) {
            _context3.next = 25;
            break;
          }

          _context3.next = 23;
          return regeneratorRuntime.awrap(Coupon.find({
            code: req.body.coupon,
            valid: "1"
          }).then(function (response) {
            couponObj = response;
          }));

        case 23:
          _context3.next = 25;
          return regeneratorRuntime.awrap(Coupon.updateOne({
            code: req.body.coupon
          }, {
            $set: {
              valid: "0"
            }
          }));

        case 25:
          _context3.next = 27;
          return regeneratorRuntime.awrap(TableModel.updateOne({
            numeroTable: req.body.table
          }, {
            $set: {
              reserve: "1"
            }
          }));

        case 27:
          pointTotal = 0;

          for (i = 0; i < req.body.quantite.length; i++) {
            pointTotal += parseInt(req.body.quantite[i]) * parseInt(req.body.point[i]);
          }

          for (i = 0; i < req.body.quantiteSupp.length; i++) {
            pointTotal += parseInt(req.body.quantiteSupp[i]) * parseInt(req.body.pointSupp[i]);
          }

          data = "Votre point de fidilte est: " + pointTotal;
          fileNameQr = 'qr' + uuid() + '.png';
          fileQrName = './app/qrimg/' + fileNameQr;
          QRCode.toFile(fileQrName, data, function (err, file) {
            var filePdfName = './app/pdf/pdf' + uuid() + '.pdf';
            var options = {
              format: 'A3',
              width: '900px',
              height: '2000px',
              zoomFactor: .5
            };
            var productsPdf = '';
            var totalProducts = 0;

            for (var i = 0; i < objData.length; i++) {
              productsPdf += "\n          <tr>\n          <td> ".concat(objData[i].nomProduct, "</td>\n          <td>").concat(req.body.quantite[i], "</td>\n          <td>").concat(objData[i].prix, " Dhs</td>\n        </tr>\n          ");
              totalProducts += objData[i].prix * req.body.quantite[i];
            }

            var suppPdf = '';
            var totalSupp = 0;

            for (var i = 0; i < objDataSupp.length; i++) {
              suppPdf += "\n      <tr>\n      <td> ".concat(objDataSupp[i].nomSupp, "</td>\n      <td>").concat(req.body.quantiteSupp[i], "</td>\n      <td>").concat(objDataSupp[i].prix, " Dhs</td>\n    </tr>\n      ");
              totalSupp += objDataSupp[i].prix * req.body.quantiteSupp[i];
            }

            var totalAll = totalProducts + totalSupp;
            var messageMin = '';

            if (couponObj[0] != undefined && req.body.coupon != '') {
              totalAll = totalAll - totalAll * couponObj[0].percent / 100;
              var messageMin = " Apres code appliquer <b> ".concat(req.body.coupon, " -").concat(couponObj[0].percent, "% </b>");
            }

            var html = "<!DOCTYPE html>\n                <html lang=\"en\">\n                <head>\n                <meta charset=\"UTF-8\">\n                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n                <meta name=\"Description\" content=\"Enter your description here\"/>\n                <!-- Latest compiled and minified CSS -->\n                <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\n\n                <!-- Optional theme -->\n                <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css\" integrity=\"sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp\" crossorigin=\"anonymous\">\n                <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css\">\n                <link rel=\"stylesheet\" href=\"assets/css/style.css\">\n                <title>Title</title>\n                <style>\n  #customers {\n    font-family: Arial, Helvetica, sans-serif;\n    border-collapse: collapse;\n    width: 100%;\n  }\n\n  #customers td, #customers th {\n    border: 1px solid #ddd;\n    padding: 8px;\n  }\n\n  #customers tr:nth-child(even){background-color: #f2f2f2;}\n\n  #customers tr:hover {background-color: #ddd;}\n\n  #customers th {\n    padding-top: 12px;\n    padding-bottom: 12px;\n    text-align: left;\n    background-color: #4CAF50;\n    color: white;\n  }\n\n  #supp {\n    font-family: Arial, Helvetica, sans-serif;\n    border-collapse: collapse;\n    width: 100%;\n  }\n\n  #supp td, #supp th {\n    border: 1px solid #ddd;\n    padding: 8px;\n  }\n\n  #supp tr:nth-child(even){background-color: #f2f2f2;}\n\n  #supp tr:hover {background-color: #ddd;}\n\n  #supp th {\n    padding-top: 12px;\n    padding-bottom: 12px;\n    text-align: left;\n    background-color: #4CAF50;\n    color: white;\n  }\n  </style>\n                </head>\n                <body>\n                    <div class=\"container\">\n                        <h1 class=\"text-center\">Bonjour votre facture Table : ".concat(req.body.table, "</h1>\n                        <h2 class=\"text-center\"> ").concat(req.body.eat, " </h2>\n                    </div>\n                    <div class=\"d-flex justify-content-center\" style=\"margin-left: 46%;\"    >\n                            <img src=\"file:///C:/Users/GITSALAH/Desktop/NodeJs/mcdo/backend/app/qrimg/").concat(fileNameQr, "\" alt=\"\">\n                    </div>\n\n                    <div>\n                    <table id=\"customers\">\n    <tr>\n      <th>Plat choisi</th>\n      <th>Quantite</th>\n      <th>Prix Unitaire</th>\n    </tr>\n  ").concat(productsPdf, "\n\n  <tr>\n    <td style=\"border:none\"></td>\n    <td><b>Total</b></td>\n    <td><b>").concat(totalProducts, " Dhs</b> </td>\n  </tr>\n  </table>\n                    </div>\n                    <div> \n                    <table id=\"customers\">\n                    <tr>\n                      <th>Supplement choisi</th>\n                      <th>Quantite</th>\n                      <th>Prix Unitaire</th>\n                    </tr>\n                  ").concat(suppPdf, "\n                \n                  <tr>\n                    <td style=\"border:none\"></td>\n                    <td><b>Total</b></td>\n                    <td><b>").concat(totalSupp, " Dhs</b> </td>\n                  </tr>\n                  </table>\n\n                      \n                    </div>\n                    <h3 class=\"text-center\"><b>Total facture : ").concat(totalAll, " Dhs</b>").concat(messageMin, "</h3>\n                    <h4>Paiement : Cash</h4>\n\n                <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js\"></script>\n                <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js\"></script>\n                <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\" integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\" crossorigin=\"anonymous\"></script>\n\n                </body>\n                </html>\n           "); // @ts-ignore

            pdf.create(html, options).toFile(filePdfName, function (err, st) {
              res.send("file:///C:/Users/GITSALAH/Desktop/NodeJs/mcdo/backend/".concat(filePdfName));
            });
          });

        case 34:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;