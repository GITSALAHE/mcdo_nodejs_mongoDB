"use strict";

//load data tables 
function loadData() {
  axios.get('http://localhost:8080/table/').then(function (res) {
    var html = '';
    var tbody = document.getElementById('tbody');
    res.data.forEach(function (element) {
      html += "\n            <tr>\n            <td>".concat(element._id, "</td>\n            <td>").concat(element.numeroTable, "</td>");

      if (element.reserve === "0") {
        html += '<td>Vide</td>';
      } else {
        html += '<td>Plein</td>';
      }

      html += "\n            <td style=\"width:200px\">\n            <a class=\"editMenu\" href=\"#editProductModal\" data-id=\"".concat(element._id, "\" data-toggle=\"modal\"><button type=\"button\" class=\"btn btn-primary\">modifier</button></a>\n           <a class=\"deleteMenu\" href=\"#deleteProductModal\" data-iddelete=\"").concat(element._id, "\" data-toggle=\"modal\">  <button type=\"button\" class=\"btn btn-danger\">supprimer</button></a>\n            </td>\n            </tr>\n            ");
    });
    tbody.innerHTML = html;
  });
}

window.addEventListener('load', loadData()); //end load data table
//add data table 

var btnAdd = document.getElementById('addTable');
btnAdd.addEventListener('click', function () {
  axios.post('http://localhost:8080/table/add').then(function (res) {
    loadData();
    console.log(res);
  });
}); //end add data table 
//update data table 

var btnUpdate = document.getElementById('updateIt');
btnUpdate.addEventListener('click', function () {
  var id = document.getElementById('idTableUpdate').value;
  var valid = document.getElementById('validUpdate').value;
  var data = {
    reserve: valid
  };
  axios.put("http://localhost:8080/table/update/".concat(id), data).then(function (res) {
    document.getElementById('hideModelEdit').click();
    console.log(res);
    loadData();
  });
}); //end update data table 
// delete data table 

var btnDelete = document.getElementById('deleteId');
btnDelete.addEventListener('click', function () {
  var id = document.getElementById('idTableDelete').value;
  axios["delete"]("http://localhost:8080/table/delete/".concat(id)).then(function (res) {
    document.getElementById('hideDelete').click();
    console.log(res);
    loadData();
  });
});