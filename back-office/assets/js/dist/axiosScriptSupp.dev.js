"use strict";

//load data supp
function loadData() {
  var html = '';
  var tbody = document.getElementById('tbody');
  axios.get('http://localhost:8080/supp/').then(function (res) {
    res.data.forEach(function (element) {
      html += "\n            <tr>\n            <td>".concat(element._id, "</td>\n            <td>").concat(element.nomSupp, "</td>\n            <td><img style=\"width:100px\" src=\"http://localhost:8080/image/").concat(element.imagePath, "\" /></td>\n            <td>").concat(element.prix, " Dhs</td>\n            <td>").concat(element.pointFid, " points</td>\n            <td style=\"width:200px\">\n            <a class=\"editMenu\" href=\"#editProductModal\" data-id=\"").concat(element._id, "\" data-toggle=\"modal\"><button type=\"button\" class=\"btn btn-primary\">modifier</button></a>\n            <a class=\"deleteMenu\" href=\"#deleteProductModal\" data-iddelete=\"").concat(element._id, "\" data-toggle=\"modal\">  <button type=\"button\" class=\"btn btn-danger\">supprimer</button></a>\n            </td>\n            </tr>\n            ");
    });
    tbody.innerHTML = html;
  });
}

window.addEventListener('load', loadData()); //end load data supp
//add data supp

var btnAdd = document.getElementById('pushdata');
btnAdd.addEventListener('click', function () {
  var fileToUpload = document.getElementById('imagePath').files[0];
  var nomProduct = document.getElementById("nomSupp").value;
  var prix = document.getElementById('prixSupp').value;
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  var fd = new FormData();
  fd.append('name', 'file');
  fd.append('file', fileToUpload);
  fd.append('nomSupp', nomProduct);
  fd.append('prix', prix);
  axios.post('http://localhost:8080/supp/add', fd, config).then(function (res) {
    document.getElementById('hideModel').click();
    console.log(res);
    loadData();
  });
}); //end add data supp
//update supp 

var btnUpdate = document.getElementById('updateIt');
btnUpdate.addEventListener('click', function () {
  var id = document.getElementById("idProductUpdate").value;
  var fileToUpload = document.getElementById('imagePathUpdate').files[0];
  var nomProduct = document.getElementById("nomSuppUpdate").value;
  var prix = document.getElementById('prixSuppUpdate').value;
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  var fd = new FormData();
  fd.append('name', 'file');
  fd.append('file', fileToUpload);
  fd.append('nomSupp', nomProduct);
  fd.append('prix', prix);
  axios.put("http://localhost:8080/supp/update/".concat(id), fd, config).then(function (res) {
    document.getElementById('hideModelEdit').click();
    console.log(res);
    loadData();
  });
}); //end update supp
//delete data supp

var btnDelete = document.getElementById('deleteId');
btnDelete.addEventListener('click', function () {
  var id = document.getElementById('idProductDelete').value;
  axios["delete"]("http://localhost:8080/supp/delete/".concat(id)).then(function (res) {
    document.getElementById('hideDelete').click();
    console.log(res);
    loadData();
  });
});