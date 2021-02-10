"use strict";

//loading data 
function loadData() {
  axios.get('http://localhost:8080/menu').then(function (response) {
    var selectIdMenu = document.getElementById('menuProduct');
    var selectIdMenuUdpate = document.getElementById('menuProductUpdate');
    var html = '<option></option>';
    response.data.forEach(function (element) {
      html += "<option value=\"".concat(element._id, "\">").concat(element.nomMenu, " </option>");
    });
    selectIdMenu.innerHTML = html;
    selectIdMenuUdpate.innerHTML = html;
  });
  axios.get('http://localhost:8080/product/backoffice').then(function _callee3(response) {
    var html, tbody;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            html = '';
            tbody = document.getElementById('tbody');
            _context3.next = 4;
            return regeneratorRuntime.awrap(response.data.forEach(function _callee2(element) {
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!(element.idSousMenu != undefined)) {
                        _context2.next = 5;
                        break;
                      }

                      _context2.next = 3;
                      return regeneratorRuntime.awrap(axios.get("http://localhost:8080/sousmenu/".concat(element.idSousMenu)).then(function _callee(sousmenu) {
                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return regeneratorRuntime.awrap(axios.get("http://localhost:8080/menu/".concat(element.idMenu)).then(function (menu) {
                                  html += "\n                        <tr>\n                        <td>".concat(element._id, "</td>\n                        <td>").concat(element.nomProduct, "</td>\n                        <td><img style=\"width:100px\" src=\"http://localhost:8080/image/").concat(element.imagePath, "\" /></td>\n                        ");
                                  html += "<td>".concat(menu.data.nomMenu, "</td>");
                                  html += "<td>".concat(sousmenu.data.nomSousMenu, "</td>");
                                  html += "<td>".concat(element.prix, " Dhs</td>\n                       <td>").concat(element.pointFid, " points</td>\n                       <td style=\"width: 218px;\">\n                       <a class=\"editMenu\" href=\"#editProductModal\" data-id=\"").concat(element._id, "\" data-toggle=\"modal\"><button type=\"button\" class=\"btn btn-primary\">modifier</button></a>\n                      <a class=\"deleteMenu\" href=\"#deleteProductModal\" data-iddelete=\"").concat(element._id, "\" data-toggle=\"modal\">  <button type=\"button\" class=\"btn btn-danger\">supprimer</button></a>\n                       </td>\n                       </tr>\n                       ");
                                  tbody.innerHTML = html;
                                }));

                              case 2:
                              case "end":
                                return _context.stop();
                            }
                          }
                        });
                      }));

                    case 3:
                      _context2.next = 7;
                      break;

                    case 5:
                      _context2.next = 7;
                      return regeneratorRuntime.awrap(axios.get("http://localhost:8080/menu/".concat(element.idMenu)).then(function (menu) {
                        html += "\n                    <tr>\n                    <td>".concat(element._id, "</td>\n                    <td>").concat(element.nomProduct, "</td>\n                    <td><img style=\"width:100px\" src=\"http://localhost:8080/image/").concat(element.imagePath, "\" /></td>\n                    ");
                        html += "<td>".concat(menu.data.nomMenu, "</td>");
                        html += "<td>sans sous menu !</td>";
                        html += "<td>".concat(element.prix, " Dhs</td>\n                   <td>").concat(element.pointFid, " points</td>\n                   <td style=\"    width: 218px;                   \">\n                   <a class=\"editMenu\" href=\"#editProductModal\" data-id=\"").concat(element._id, "\" data-toggle=\"modal\"><button type=\"button\" class=\"btn btn-primary\">modifier</button></a>\n                   <a class=\"deleteMenu\" href=\"#deleteProductModal\" data-iddelete=\"").concat(element._id, "\" data-toggle=\"modal\">  <button type=\"button\" class=\"btn btn-danger\">supprimer</button></a>\n                   </td>\n                   </tr>\n                   ");
                        tbody.innerHTML = html;
                      }));

                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            }));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
}

function loadSousMenu() {
  var idMenu = document.getElementById('menuProduct').value;
  axios.get("http://localhost:8080/sousmenu/select/".concat(idMenu)).then(function (response) {
    var selectIdMenu = document.getElementById('sousMenuProduct');
    var html = '<option value="">sans sous menu</option>';
    response.data.forEach(function (element) {
      html += "<option value=\"".concat(element._id, "\">").concat(element.nomSousMenu, " </option>");
    });
    selectIdMenu.innerHTML = html;
  });
}

function loadSousMenuUpdate() {
  var idMenu = document.getElementById('menuProductUpdate').value;
  axios.get("http://localhost:8080/sousmenu/select/".concat(idMenu)).then(function (response) {
    var selectIdMenu = document.getElementById('sousMenuProductUpdate');
    var html = '<option value="">sans sous menu</option>';
    response.data.forEach(function (element) {
      html += "<option value=\"".concat(element._id, "\">").concat(element.nomSousMenu, " </option>");
    });
    selectIdMenu.innerHTML = html;
  });
}

window.addEventListener('load', loadData()); //add data product 

var btnAdd = document.getElementById('pushdata');
btnAdd.addEventListener('click', function () {
  var fileToUpload = document.getElementById('imagePath').files[0];
  var nomProduct = document.getElementById("nomProduct").value;
  var idMenu = document.getElementById('menuProduct').value;
  var idSousMenu = document.getElementById('sousMenuProduct').value;
  var prix = document.getElementById('prixProduct').value;
  var ingredient = document.getElementById('ingredient').value;
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  var fd = new FormData();
  fd.append('name', 'file');
  fd.append('file', fileToUpload);
  fd.append('nomProduct', nomProduct);
  fd.append('idMenu', idMenu);

  if (idSousMenu !== "") {
    fd.append('idSousMenu', idSousMenu);
  }

  fd.append('prix', prix);
  fd.append('ingredient', ingredient);
  axios.post("http://localhost:8080/product/add", fd, config).then(function (res) {
    document.getElementById('hideModel').click();
    console.log(res);
    loadData();
    loadSousMenu();
    loadSousMenuUpdate();
  });
}); //end add data product 
//update data product 

var btnUpdate = document.getElementById('updateIt');
btnUpdate.addEventListener('click', function () {
  var id = document.getElementById('idProductUpdate').value;
  var fileToUpload = document.getElementById('imagePathUpdate').files[0];
  var nomProduct = document.getElementById("nomProductUpdate").value;
  var idMenu = document.getElementById('menuProductUpdate').value;
  var idSousMenu = document.getElementById('sousMenuProductUpdate').value;
  var prix = document.getElementById('prixProductUpdate').value;
  var ingredient = document.getElementById('ingredientUpdate').value;
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  var fd = new FormData();
  fd.append('name', 'file');
  fd.append('file', fileToUpload);
  fd.append('nomProduct', nomProduct);
  fd.append('idMenu', idMenu);

  if (idSousMenu !== "") {
    fd.append('idSousMenu', idSousMenu);
  }

  fd.append('prix', prix);
  fd.append('ingredient', ingredient);
  axios.put("http://localhost:8080/product/update/".concat(id), fd, config).then(function (res) {
    document.getElementById('hideModelEdit').click();
    console.log(res);
    loadData();
    loadSousMenu();
    loadSousMenuUpdate();
  });
}); //end update data product 
//delete data product 

var btnDelete = document.getElementById('deleteId');
btnDelete.addEventListener('click', function () {
  var id = document.getElementById('idProductDelete').value;
  axios["delete"]("http://localhost:8080/product/delete/".concat(id)).then(function (success) {
    document.getElementById('hideDelete').click();
    console.log(success);
    loadData();
    loadSousMenu();
    loadSousMenuUpdate();
  });
});