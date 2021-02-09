//loading data 
function loadData() {
    axios.get('http://localhost:8080/menu').then((response) => {
        var selectIdMenu = document.getElementById('menuProduct');
        var selectIdMenuUdpate = document.getElementById('menuProductUpdate');
        var html = '<option></option>';
        response.data.forEach(element => {
            html += `<option value="${element._id}">${element.nomMenu} </option>`;
        });
        selectIdMenu.innerHTML = html;
        selectIdMenuUdpate.innerHTML = html;
    })
    axios.get('http://localhost:8080/product/backoffice').then(async (response) => {
        var html = '';
        var tbody = document.getElementById('tbody');

        await response.data.forEach(async element => {

            if (element.idSousMenu != undefined) {

                await axios.get(`http://localhost:8080/sousmenu/${element.idSousMenu}`).then(async (sousmenu) => {
                    await axios.get(`http://localhost:8080/menu/${element.idMenu}`).then((menu)=>{
                        html += `
                        <tr>
                        <td>${element._id}</td>
                        <td>${element.nomProduct}</td>
                        <td><img style="width:100px" src="http://localhost:8080/image/${element.imagePath}" /></td>
                        `
                                html += `<td>${menu.data.nomMenu}</td>`
            
                                html += `<td>${sousmenu.data.nomSousMenu}</td>`;
            
            
                                html += `<td>${element.prix} Dhs</td>
                       <td>${element.pointFid} points</td>
                       <td style="width: 218px;">
                       <a class="editMenu" href="#editProductModal" data-id="${element._id}" data-toggle="modal"><button type="button" class="btn btn-primary">modifier</button></a>
                      <a class="deleteMenu" href="#deleteProductModal" data-iddelete="${element._id}" data-toggle="modal">  <button type="button" class="btn btn-danger">supprimer</button></a>
                       </td>
                       </tr>
                       `
                                tbody.innerHTML = html
                    })

                })
            }
            else {
                await axios.get(`http://localhost:8080/menu/${element.idMenu}`).then((menu)=>{
                    html += `
                    <tr>
                    <td>${element._id}</td>
                    <td>${element.nomProduct}</td>
                    <td><img style="width:100px" src="http://localhost:8080/image/${element.imagePath}" /></td>
                    `
                            html += `<td>${menu.data.nomMenu}</td>`
        
                            html += `<td>sans sous menu !</td>`;
        
        
                            html += `<td>${element.prix} Dhs</td>
                   <td>${element.pointFid} points</td>
                   <td style="    width: 218px;                   ">
                   <a class="editMenu" href="#editProductModal" data-id="${element._id}" data-toggle="modal"><button type="button" class="btn btn-primary">modifier</button></a>
                   <a class="deleteMenu" href="#deleteProductModal" data-iddelete="${element._id}" data-toggle="modal">  <button type="button" class="btn btn-danger">supprimer</button></a>
                   </td>
                   </tr>
                   `
                            tbody.innerHTML = html
                })
            }

        });

    });
}

function loadSousMenu() {
    var idMenu = document.getElementById('menuProduct').value;
    axios.get(`http://localhost:8080/sousmenu/select/${idMenu}`).then((response) => {
        var selectIdMenu = document.getElementById('sousMenuProduct');
        var html = '<option value="">sans sous menu</option>';
        response.data.forEach(element => {
            html += `<option value="${element._id}">${element.nomSousMenu} </option>`;
        });
        selectIdMenu.innerHTML = html;
    })
}
function loadSousMenuUpdate() {
    var idMenu = document.getElementById('menuProductUpdate').value;
    axios.get(`http://localhost:8080/sousmenu/select/${idMenu}`).then((response) => {
        var selectIdMenu = document.getElementById('sousMenuProductUpdate');
        var html = '<option value="">sans sous menu</option>';
        response.data.forEach(element => {
            html += `<option value="${element._id}">${element.nomSousMenu} </option>`;
        });
        selectIdMenu.innerHTML = html;
    })
}
window.addEventListener('load', loadData());

//add data product 

var btnAdd = document.getElementById('pushdata');
btnAdd.addEventListener('click', () => {
    var fileToUpload = document.getElementById('imagePath').files[0];
    var nomProduct = document.getElementById("nomProduct").value;
    var idMenu = document.getElementById('menuProduct').value;
    var idSousMenu = document.getElementById('sousMenuProduct').value;
    var prix = document.getElementById('prixProduct').value;
    var ingredient = document.getElementById('ingredient').value;

    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    let fd = new FormData()
    fd.append('name', 'file')
    fd.append('file', fileToUpload)
    fd.append('nomProduct', nomProduct)
    fd.append('idMenu', idMenu)
    if (idSousMenu !== "") {
        fd.append('idSousMenu', idSousMenu)
    }
    fd.append('prix', prix)
    fd.append('ingredient', ingredient)

    axios.post("http://localhost:8080/product/add", fd, config).then((res) => {
        console.log(res);
    })
}) 

//end add data product 


//update data product 
var btnUpdate = document.getElementById('updateIt');
btnUpdate.addEventListener('click', () => {
    var id = document.getElementById('idProductUpdate').value;
    var fileToUpload = document.getElementById('imagePathUpdate').files[0];
    var nomProduct = document.getElementById("nomProductUpdate").value;
    var idMenu = document.getElementById('menuProductUpdate').value;
    var idSousMenu = document.getElementById('sousMenuProductUpdate').value;
    var prix = document.getElementById('prixProductUpdate').value;
    var ingredient = document.getElementById('ingredientUpdate').value;
    
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    let fd = new FormData()
    fd.append('name', 'file')
    fd.append('file', fileToUpload)
    fd.append('nomProduct', nomProduct)
    fd.append('idMenu', idMenu)
    if (idSousMenu !== "") {
        fd.append('idSousMenu', idSousMenu)
    }
    fd.append('prix', prix)
    fd.append('ingredient', ingredient)

    axios.put(`http://localhost:8080/product/update/${id}`, fd, config).then((res) => {
        console.log(res);
    })
})

//end update data product 

//delete data product 

var btnDelete = document.getElementById('deleteId');

btnDelete.addEventListener('click', () => {
    var id = document.getElementById('idProductDelete').value;
    axios.delete(`http://localhost:8080/product/delete/${id}`).then((success) => {
        console.log(success);
    })
})