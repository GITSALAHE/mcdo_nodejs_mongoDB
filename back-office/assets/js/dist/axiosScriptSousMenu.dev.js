"use strict";

//add data sous menu 
function loadMenus() {
  axios.get('http://localhost:8080/menu').then(function (response) {
    var selectIdMenu = document.getElementById('idMenu');
    var selectIdMenuUdpate = document.getElementById('menuIdUpdate');
    var html = '';
    response.data.forEach(function (element) {
      html += "<option value=\"".concat(element._id, "\">").concat(element.nomMenu, " </option>");
    });
    selectIdMenu.innerHTML = html;
    selectIdMenuUdpate.innerHTML = html;
  });
  axios.get('http://localhost:8080/sousmenu').then(function (response) {
    var tbody = document.getElementById('tbody');
    var html = '';
    response.data.forEach(function (element) {
      html += "\n                    <tr>\n                    <td style=\"width:100px\">".concat(element._id, "</td>\n                    <td style=\"width:100px\"><img  style=\"width:100px\" src=\"http://localhost:8080/image/").concat(element.imagePath, "\" /></td>\n                    <td style=\"width:100px\">").concat(element.nomSousMenu, "</td>\n                    <td style=\"width:100px\"><a class=\"editMenu\" href=\"#editProductModal\" data-id=\"").concat(element._id, "\" data-toggle=\"modal\"><button type=\"button\" class=\"btn btn-primary\">modifier</button></a>\n                    <a class=\"deleteMenu\" href=\"#deleteProductModal\" data-iddelete=\"").concat(element._id, "\" data-toggle=\"modal\">  <button type=\"button\" class=\"btn btn-danger\">supprimer</button></a></td>\n                    <tr>\n                    ");
    });
    tbody.innerHTML = html;
  });
}

window.addEventListener('load', loadMenus()); //load data in select menu 

var btnAdd = document.getElementById('pushdata');
btnAdd.addEventListener('click', function () {
  var nomSousMenu = document.getElementById('nomSousMenu').value;
  var idMenu = document.getElementById('idMenu').value;
  var fileToUpload = document.getElementById('imageSousMenu').files[0];
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  var fd = new FormData();
  fd.append('name', 'file');
  fd.append('file', fileToUpload);
  fd.append('nomSousMenu', nomSousMenu);
  fd.append('idMenu', idMenu);
  axios.post('http://localhost:8080/sousmenu/add', fd, config).then(function (response) {
    document.getElementById('hideModel').click();
    console.log(response);
    loadMenus();
  });
}); //end add data sous menu 
//update data sous menu 

var btnUpdate = document.getElementById('updateIt');
btnUpdate.addEventListener('click', function () {
  var id = document.getElementById('idMenuUpdate').value;
  var nomSousMenu = document.getElementById('nomSousMenuUpdate').value;
  var idMenu = document.getElementById('menuIdUpdate').value;
  var fileToUpload = document.getElementById('imageSousMenuUpdate').files[0];
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  var fd = new FormData();
  fd.append('name', 'file');
  fd.append('file', fileToUpload);
  fd.append('nomSousMenu', nomSousMenu);
  fd.append('idMenu', idMenu);
  axios.put("http://localhost:8080/sousmenu/update/".concat(id), fd, config).then(function (res) {
    document.getElementById('hideModelEdit').click();
    console.log(res);
    loadMenus();
  });
}); //end update data sous menu 
//delete sous menu 

var btnDelete = document.getElementById('deleteId');
btnDelete.addEventListener('click', function () {
  var id = document.getElementById('idMenuDelete').value;
  axios["delete"]("http://localhost:8080/sousmenu/delete/".concat(id)).then(function (res) {
    document.getElementById('hideDelete').click();
    console.log(res);
    loadMenus();
  });
});