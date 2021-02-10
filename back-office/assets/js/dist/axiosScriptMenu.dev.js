"use strict";

//load data menu 
function loadDataMenu() {
  axios.get('http://localhost:8080/menu/').then(function (success) {
    var tbody = document.getElementById('tbody');
    var html = '';
    success.data.forEach(function (element) {
      html += "<tr>\n           <td style=\"width:100px\">".concat(element._id, "</td>\n           <td style=\"width:100px\"><img style=\"width:100px\" src=\"http://localhost:8080/image/").concat(element.imagePath, "\"></td>\n           <td style=\"width:100px\">").concat(element.nomMenu, "</td>\n           <td><a class=\"editMenu\" href=\"#editProductModal\" data-id=\"").concat(element._id, "\" data-toggle=\"modal\"><button type=\"button\" class=\"btn btn-primary\">modifier</button></a>\n           <a class=\"deleteMenu\" href=\"#deleteProductModal\" data-iddelete=\"").concat(element._id, "\" data-toggle=\"modal\">  <button type=\"button\" class=\"btn btn-danger\">supprimer</button></a>\n           </td>\n           <tr>");
    });
    tbody.innerHTML = html;
  });
}

window.addEventListener('load', loadDataMenu); //end load data menu 
//add menu 

var btnPush = document.getElementById("pushdata");
btnPush.addEventListener('click', function () {
  var nomMenu = document.getElementById('nomMenu').value;
  var fileToUpload = document.querySelector('input[type=file]').files[0];
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  var fd = new FormData();
  fd.append('name', 'file');
  fd.append('file', fileToUpload);
  fd.append('nomMenu', nomMenu);
  axios.post('http://localhost:8080/menu/add', fd, config).then(function (response) {
    document.getElementById('hideModel').click();
    console.log("Image posted successfully: ", response);
    loadDataMenu();
  });
}); //end add menu
//update menu 

var btnUpdate = document.getElementById('updateIt');
btnUpdate.addEventListener('click', function () {
  var idModal = document.getElementById('idMenu').value;
  var nomMenu = document.getElementById('nomMenuUpdate').value;
  var fileToUpload = document.getElementById('imageMenuUpdate').files[0];
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  var fd = new FormData();
  fd.append('name', 'file');
  fd.append('file', fileToUpload);
  fd.append('nomMenu', nomMenu);
  axios.put("http://localhost:8080/menu/update/".concat(idModal), fd, config).then(function (response) {
    document.getElementById('hideModelEdit').click();
    console.log("Image posted successfully: ", response);
    loadDataMenu();
  });
}); // end update menu 
//delete menu 

var btnDelete = document.getElementById('deleteId');
btnDelete.addEventListener('click', function () {
  var idModal = document.getElementById('idMenuDelete').value;
  axios["delete"]("http://localhost:8080/menu/delete/".concat(idModal)).then(function (response) {
    document.getElementById('hideDelete').click();
    console.log("Image posted successfully: ", response);
    loadDataMenu();
  });
}); //end delete menu