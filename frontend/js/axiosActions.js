function loadData(){
    axios.get('http://localhost:8080/menu').then((res) => {
        var html = '';
        var menuAppend = document.getElementById('menus');
        res.data.forEach(element => {
            html += `
            <div class="product">
               
            <a class="menus btn btn-primary" data-toggle="modal" href="#sousmenu" data-id="${element._id}">
                <img src="http://localhost:8080/image/${element.imagePath}" alt="back">
                <p>${element.nomMenu}</p>
            </a>

        </div>
            `;
        });
        menuAppend.innerHTML = html
    })

    axios.get('http://localhost:8080/supp').then((res) => {
        var html = '';
        var suppAppend = document.getElementById('supplement');
        var i = 1;
        res.data.forEach(element => {
            html += `
            <div class="product">
                <input type="checkbox" id="checkSupp${i}">
                <input type="hidden" id="idSupp${i}" value="${element._id}">
                <input type="hidden" id="pointSupp${i}" value="${element.pointFid}">
                <img src="http://localhost:8080/image/${element.imagePath}" alt="back">
                <p>${element.nomSupp} </p>
                <p> ${element.prix}</p>
                <input type="number" value="1" class="number" id="qtSupp${i}" min="1" max="20">
                ${i++}
            </div>
            `;
        });
        suppAppend.innerHTML = html
    })

    axios.get('http://localhost:8080/table/frontend').then((response) => {
        var htmlTable = '';
        var elementTable = document.getElementById('tableDispo');
        if(response.data.length <= 0){
          htmlTable += `
          <option >Tous les tables est reservé !</option>
          `
          document.getElementById('cashPurchase').disabled = true
        }
        else{
          response.data.forEach(element => {
            htmlTable += `
            <option value="${element.numeroTable}">${element.numeroTable}</option>
            `
        });
        }
    
       
        elementTable.innerHTML = htmlTable;
      })
}

window.addEventListener('load', loadData())

$(document).on("click", ".menus", function () {
    var menuId = $(this).data('id');
    $(".modal-content-sousmenu #idMenu").val( menuId );
    
    axios.get(`http://localhost:8080/sousmenu/findmenu/${menuId}`).then((response) => {
        var html = '';
        var appendSousMenu = document.getElementById('sousmenus');
        response.data.forEach(element => {
            html += `
            <div class="product">
               
            <a class="sousmenu btn btn-primary" data-toggle="modal" href="#productmodal" data-id="${element._id}">
                <img src="http://localhost:8080/image/${element.imagePath}" alt="back">
                <p>${element.nomSousMenu}</p>
            </a>
        </div>
            `;
        });
        appendSousMenu.innerHTML = html
    })
})

$(document).on("click", ".sousmenu", function () {
    var menuId = $(this).data('id');
    $(".modal-content-product #idSousMenu").val( menuId );

    axios.get(`http://localhost:8080/product/frontoffice/${menuId}`).then((response) => {
        var html = '';
        var appendProduct = document.getElementById('productsAppend');
        var i = 1;
        response.data.forEach(element => {
            html += `
            <div class="product">
            <input type="checkbox" id="check${i}">
            <img src="http://localhost:8080/image/${element.imagePath}" alt="back" >
            <p>${element.nomProduct} </p>
            <p> ${element.prix} Dhs</p>
            <input type="number" value="1" class="number" id="qt${i}" min="1" max="20">
            <input type="hidden" id="id${i}" value="${element._id}">
            <input type="hidden" id="point${i}" value="${element.pointFid}">
            ${i++}
        </div>
            `;
        });
        appendProduct.innerHTML = html;
    })
})


$(document).on("click", ".waystopayment", function () {
    var menuId = $(this).data('method');
    $(".modal-content-payment #method").val( menuId );

})

var btnCash = document.getElementById('btnCash')
    btnCash.addEventListener('click', () => {
    btnCash.disabled = true;
    var data  ={}
    var quantite = [];
    var point = [];
    var id = [];
    var quantiteSupp  = [];
    var pointSupp  = [];
    var idSupp  = [];
    for(var i = 0;i < 100000;i++){
        if(document.getElementById('check'+i) != null){
            if(document.getElementById('check'+i).checked == true){
                var quantiteValue = document.getElementById('qt'+i).value;
                quantite.push(quantiteValue);
                var pointValue = document.getElementById('point'+i).value;
                point.push(pointValue);
                var idValue = document.getElementById('id'+i).value;
                id.push(idValue);
            }
        }
        
    }
    for(var i = 0;i < 100000;i++){
      if(document.getElementById('checkSupp'+i) != null){
          if(document.getElementById('checkSupp'+i).checked == true){
              var quantiteValue = document.getElementById('qtSupp'+i).value;
              quantiteSupp.push(quantiteValue);
              var pointValue = document.getElementById('pointSupp'+i).value;
              pointSupp.push(pointValue);
              var idValue = document.getElementById('idSupp'+i).value;
              idSupp.push(idValue);
          }
      }
      
  }
  var method = document.getElementById('method').value;
  if(method === 'atable'){
    method = 'Servis à table'
  }
  else if(method === 'emporte'){
    method = 'Emporté';
  }
  var coupon = document.getElementById('coupon').value;
  var table = document.getElementById('tableDispo').value;
  data = {
    quantite : quantite,
    point : point,
    pointSupp : pointSupp,
    id : id,
    idSupp : idSupp,
    quantiteSupp : quantiteSupp,
    coupon : coupon,
    table : table,
    eat : method
  }
  axios.post('http://localhost:8080/checkout/table', data).then((res) => {
    
    window.open(res.data)
    window.location.href = 'index.html'
 })
})






const stripe = Stripe('pk_test_51GxrgnJjT1M3ZAOSLSz7QMUEmhim5MKh9xcwOdQDwmZgMRZeefa7rkvolkuCidgx2wtmWAYeN3tI46FUt3xWIRfO00hb1onjbQ'); // put your public key stripe 
const elements = stripe.elements();
var style = {
    base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        },
        border: '1px solid'
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
}
const card = elements.create('card', { style });
card.mount('#card-element');

async function payment(){
    var nom = document.getElementById('nom').value;
    var email = document.getElementById('email').value;
    var coupon = document.getElementById('coupon').value;
    var form = document.getElementById('payment-form');
    const stripeTokenHandler = token => {
      const hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('id', 'stripeTKN');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);
  
      console.log(form)
     
  }
  await stripe.createToken(card).then(res => {
    if (res.error) errorEl.textContent = res.error.message;
    else {
        console.log(res.token)
        stripeTokenHandler(res.token);
    }
  })

   
  var method = document.getElementById('method').value;
  if(method === 'atable'){
    method = 'Servis à table'
  }
  else if(method === 'emporte'){
    method = 'Emporté';
  }
    var data  ={}
      var quantite = [];
      var point = [];
      var id = [];
      var quantiteSupp  = [];
      var pointSupp  = [];
      var idSupp  = [];
      for(var i = 0;i < 100000;i++){
          if(document.getElementById('check'+i) != null){
              if(document.getElementById('check'+i).checked == true){
                  var quantiteValue = document.getElementById('qt'+i).value;
                  quantite.push(quantiteValue);
                  var pointValue = document.getElementById('point'+i).value;
                  point.push(pointValue);
                  var idValue = document.getElementById('id'+i).value;
                  id.push(idValue);
              }
          }
          
      }
      for(var i = 0;i < 100000;i++){
        if(document.getElementById('checkSupp'+i) != null){
            if(document.getElementById('checkSupp'+i).checked == true){
                var quantiteValue = document.getElementById('qtSupp'+i).value;
                quantiteSupp.push(quantiteValue);
                var pointValue = document.getElementById('pointSupp'+i).value;
                pointSupp.push(pointValue);
                var idValue = document.getElementById('idSupp'+i).value;
                idSupp.push(idValue);
            }
        }
        
    }
    var stripeTkn = document.getElementById('stripeTKN').value;
      var table = document.getElementById('tableDispo').value;
     data = {
      quantite : quantite,
      point : point,
      pointSupp : pointSupp,
      id : id,
      idSupp : idSupp,
      quantiteSupp : quantiteSupp,
      coupon : coupon,
      table : table,
      eat : method,
      name : nom,
      email : email,
      stripeToken:stripeTkn,
    }
    axios.post('http://localhost:8080/checkout/cc', data).then((res) => {
      
       window.open(res.data)
       window.location.href = 'index.html'
    })
  }