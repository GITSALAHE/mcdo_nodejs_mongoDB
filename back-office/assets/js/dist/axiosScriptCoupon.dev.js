"use strict";

//laod coupon data 
function loadData() {
  var tbody = document.getElementById('tbody');
  var html = '';
  axios.get('http://localhost:8080/coupon').then(function (res) {
    res.data.forEach(function (element) {
      html += "\n            <tr>\n                <td>".concat(element._id, "</td>\n                <td>").concat(element.code, "</td>\n                <td>").concat(element.percent, " %</td>\n               ");

      if (element.valid === "0") {
        html += "<td>Deja utilis\xE9</td>";
      } else {
        html += "<td>Jamais utilis\xE9</td>";
      }

      html += "\n                <td style=\"width:200px\">\n                <a class=\"editMenu\" href=\"#editProductModal\" data-id=\"".concat(element._id, "\" data-toggle=\"modal\"><button type=\"button\" class=\"btn btn-primary\">modifier</button></a>\n                <a class=\"deleteMenu\" href=\"#deleteProductModal\" data-iddelete=\"").concat(element._id, "\" data-toggle=\"modal\">  <button type=\"button\" class=\"btn btn-danger\">supprimer</button></a>\n                </td>\n            </tr>\n            ");
    });
    tbody.innerHTML = html;
  });
}

window.addEventListener('load', loadData()); //add coupon data 

var btnAdd = document.getElementById('pushdata');
btnAdd.addEventListener('click', function () {
  var code = document.getElementById('code').value;
  var percent = document.getElementById('percent').value;
  var data = {
    code: code,
    percent: percent
  };
  axios.post('http://localhost:8080/coupon/add', data).then(function (res) {
    document.getElementById('hideModel').click();
    console.log(res);
    loadData();
  });
}); //update coupon 

var btnUpdate = document.getElementById('updateIt');
btnUpdate.addEventListener('click', function () {
  var id = document.getElementById('idCouponUpdate').value;
  var code = document.getElementById('codeUpdate').value;
  var percent = document.getElementById('percentUpdate').value;
  var data = {
    code: code,
    percent: percent
  };
  axios.put("http://localhost:8080/coupon/update/".concat(id), data).then(function (res) {
    document.getElementById('hideModelEdit').click();
    console.log(res);
    loadData();
  });
}); //end update coupon
//delete coupon

var btnDelete = document.getElementById('deleteId');
btnDelete.addEventListener('click', function () {
  var id = document.getElementById('idCouponDelete').value;
  axios["delete"]("http://localhost:8080/coupon/delete/".concat(id)).then(function (res) {
    document.getElementById('hideDelete').click();
    console.log(res);
    loadData();
  });
}); //end delete coupon