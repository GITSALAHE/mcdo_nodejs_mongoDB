"use strict";

function translator() {
  var obj = {
    ar: {
      titleHtml: "ماكدونالد",
      cssPath: "../Style/ProductsAr.css",
      homePageName: "قائمتنا",
      sousMenuTitle: "تحت القائمة",
      nextButton: "التالي",
      productTitle: "الأطباق",
      suppTitle: "التحلية",
      methodeTitle: "كيفية التسليم",
      emporte: "خده معك",
      atable: "كل هنا",
      paymentTitle: "وسيلة الدفع",
      titleCC: "الدفع عبر البطاقة",
      nom: "الاسم",
      email: "البريد الالكتروني",
      cc: "البطاقة البنكية",
      purchaseButton: "الشراء",
      titleCash: "الدفع بالنقود",
      numberTable: "رقم الطاولة المتوفرة",
      coupon: "كبون الخصم"
    },
    an: {
      titleHtml: "Mcdonald",
      cssPath: "../Style/ProductsAn.css",
      homePageName: "Our menus",
      sousMenuTitle: "SubMenus",
      nextButton: "next",
      productTitle: "Products",
      suppTitle: "Supplements",
      methodeTitle: "Shipping method",
      emporte: "take it",
      atable: "eat it here",
      paymentTitle: "payement method",
      titleCC: "Pay with credit card",
      nom: "Name",
      email: "Email",
      cc: "credit card",
      purchaseButton: "Purchase",
      titleCash: "Pay with cash",
      numberTable: "Table number available",
      coupon: "Coupon"
    },
    fr: {
      titleHtml: "Mcdonald",
      cssPath: "../Style/Products.css",
      homePageName: "Nos menus",
      sousMenuTitle: "Nos sous menus",
      nextButton: "suivant",
      productTitle: "Nos produits",
      suppTitle: "Supplements",
      methodeTitle: "Livraison method",
      emporte: "Emporté",
      atable: "Manger à table",
      paymentTitle: "Methode de Paiements",
      titleCC: "Payer avec carte bancaire",
      nom: "Nom",
      email: "Email",
      cc: "carte credit/ carte debit",
      purchaseButton: "acheter",
      titleCash: "Payer avec cash",
      numberTable: "Numero table disponible:",
      coupon: "Coupon"
    }
  };
  var urlString = window.location.search;
  var urlParam = new URLSearchParams(urlString);
  var language = urlParam.get('lang');

  if (language === "ar") {
    document.title = obj.ar.titleHtml;
    document.getElementById('css').setAttribute('href', obj.ar.cssPath);
    document.getElementById('menuTrans').innerHTML = obj.ar.homePageName;
    document.getElementById('sousMenuTrans').innerHTML = obj.ar.sousMenuTitle;
    document.getElementById('produitTrans').innerHTML = obj.ar.productTitle;
    document.getElementById('supplementButtonTrans').innerHTML = obj.ar.suppTitle;
    document.getElementById('suppTitleTrans').innerHTML = obj.ar.suppTitle;
    document.getElementById('nextButtonTrans').innerHTML = obj.ar.nextButton;
    document.getElementById('methodShipTrans').innerHTML = obj.ar.methodeTitle;
    document.getElementById('emporteTrans').innerHTML = obj.ar.emporte;
    document.getElementById('atableTrans').innerHTML = obj.ar.atable;
    document.getElementById('methodPayTrans').innerHTML = obj.ar.paymentTitle;
    document.getElementById('paymentTitleTrans').innerHTML = obj.ar.titleCC;
    document.getElementById('nomTrans').innerHTML = obj.ar.nom;
    document.getElementById('emailTrans').innerHTML = obj.ar.email;
    document.getElementById('ccTrans').innerHTML = obj.ar.cc;
    document.getElementById('purchaseTrans').value = obj.ar.purchaseButton;
    document.getElementById('cashTrans').innerHTML = obj.ar.titleCash;
    document.getElementById('nbTableTrans').innerHTML = obj.ar.numberTable;
    document.getElementById('btnCash').value = obj.ar.purchaseButton;
    document.getElementById('couponTrans').innerHTML = obj.ar.coupon;
    document.getElementById('coupon').placeholder = obj.ar.coupon;
  } else if (language === "fr") {
    document.title = obj.fr.titleHtml;
    document.getElementById('css').setAttribute('href', obj.fr.cssPath);
    document.getElementById('menuTrans').innerHTML = obj.fr.homePageName;
    document.getElementById('sousMenuTrans').innerHTML = obj.fr.sousMenuTitle;
    document.getElementById('produitTrans').innerHTML = obj.fr.productTitle;
    document.getElementById('supplementButtonTrans').innerHTML = obj.fr.suppTitle;
    document.getElementById('suppTitleTrans').innerHTML = obj.fr.suppTitle;
    document.getElementById('nextButtonTrans').innerHTML = obj.fr.nextButton;
    document.getElementById('methodShipTrans').innerHTML = obj.fr.methodeTitle;
    document.getElementById('emporteTrans').innerHTML = obj.fr.emporte;
    document.getElementById('atableTrans').innerHTML = obj.fr.atable;
    document.getElementById('methodPayTrans').innerHTML = obj.fr.paymentTitle;
    document.getElementById('paymentTitleTrans').innerHTML = obj.fr.titleCC;
    document.getElementById('nomTrans').innerHTML = obj.fr.nom;
    document.getElementById('emailTrans').innerHTML = obj.fr.email;
    document.getElementById('ccTrans').innerHTML = obj.fr.cc;
    document.getElementById('purchaseTrans').value = obj.fr.purchaseButton;
    document.getElementById('cashTrans').innerHTML = obj.fr.titleCash;
    document.getElementById('nbTableTrans').innerHTML = obj.fr.numberTable;
    document.getElementById('btnCash').value = obj.fr.purchaseButton;
    document.getElementById('couponTrans').innerHTML = obj.fr.coupon;
    document.getElementById('coupon').placeholder = obj.fr.coupon;
  } else if (language === "an") {
    document.title = obj.an.titleHtml;
    document.getElementById('css').setAttribute('href', obj.an.cssPath);
    document.getElementById('menuTrans').innerHTML = obj.an.homePageName;
    document.getElementById('sousMenuTrans').innerHTML = obj.an.sousMenuTitle;
    document.getElementById('produitTrans').innerHTML = obj.an.productTitle;
    document.getElementById('supplementButtonTrans').innerHTML = obj.an.suppTitle;
    document.getElementById('suppTitleTrans').innerHTML = obj.an.suppTitle;
    document.getElementById('nextButtonTrans').innerHTML = obj.an.nextButton;
    document.getElementById('methodShipTrans').innerHTML = obj.an.methodeTitle;
    document.getElementById('emporteTrans').innerHTML = obj.an.emporte;
    document.getElementById('atableTrans').innerHTML = obj.an.atable;
    document.getElementById('methodPayTrans').innerHTML = obj.an.paymentTitle;
    document.getElementById('paymentTitleTrans').innerHTML = obj.an.titleCC;
    document.getElementById('nomTrans').innerHTML = obj.an.nom;
    document.getElementById('emailTrans').innerHTML = obj.an.email;
    document.getElementById('ccTrans').innerHTML = obj.an.cc;
    document.getElementById('purchaseTrans').value = obj.an.purchaseButton;
    document.getElementById('cashTrans').innerHTML = obj.an.titleCash;
    document.getElementById('nbTableTrans').innerHTML = obj.an.numberTable;
    document.getElementById('btnCash').value = obj.an.purchaseButton;
    document.getElementById('couponTrans').innerHTML = obj.an.coupon;
    document.getElementById('coupon').placeholder = obj.an.coupon;
  } else {
    window.location.href = 'products.html?lang=fr';
  }
}

window.addEventListener('load', translator());