(()=>{"use strict";class e{constructor(e,t,o,a,r,n){this._id=e,this.price=t,this.name=o,this.imageUrl=a,this.description=r,this.colors=n}getHtml(){return'<div class="produitsOrinoco col-lg-4" ><a href="produit.html?id='+this._id+'" class="produits"> <div class="produit card"><div><img class="produit-image card-img-top" src="'+this.imageUrl+'" alt="nounours"></div><div class="produit-description card-body"><div class="produit-name"><span>'+this.name+'</span></div><div class="produit-price">  <span> '+this.price/100+"€</span></div></div></div></a></div>"}getHtmlProduit(){var e="";for(let t of this.colors)e+='<option value="'+t+'">'+t+"</option>";return'<div class="row"><div class="col-sm-12"><div class="produit card"> <div><img class="produit-image card-img-top" src="'+this.imageUrl+'" alt="nounours"></div><div class="produit-description card-body"><div class="produit-name"><span>'+this.name+'</span></div> <div class="produit-price">     <span> '+this.description+'</span></div> <div class="produit-price">  <span> '+this.price/100+'€</span></div><select name="colors" id="addColors">'+e+'</select></div><button id="addPanier" class="btn btn-secondary">  ajouter au panier </button></div></div></div>'}}class t{addProduct(e,t,o,a){var r=e+"_"+a.toLowerCase().replace(" ","_");console.log(r);var n=localStorage.getItem("panier");(n=n?JSON.parse(n):{})[r]={name:t,qty:1,color:a,price:o},localStorage.setItem("panier",JSON.stringify(n))}setProductQty(e,t){var o=localStorage.getItem("panier");(o=JSON.parse(o))[e].qty=t,localStorage.setItem("panier",JSON.stringify(o))}getProduits(){var e=localStorage.getItem("panier");return JSON.parse(e)}getTotal(){var e=0;for(let[t,o]of Object.entries(this.getProduits()))e+=o.price*o.qty;return e}getColors(){return localStorage.getItem("colors")}getHtmlQuantity(e,t){for(var o='<select name="quantite" id="'+e+'">',a=1;a<=10;a++)o+=a==t?'<option value="'+a+'" selected>'+a+"</option>":'<option value="'+a+'">'+a+"</option>";return o+"</select>"}}if("/"==window.location.pathname&&fetch("http://localhost:3000/api/teddies").then((function(e){if(e.ok)return e.json();alert("orinoco momentanément indisponible :( a")})).then((function(t){for(let a of t){var o=new e(a._id,a.price,a.name,a.imageUrl,a.description,a.colors);document.getElementById("container").innerHTML+=o.getHtml()}})).catch((function(e){console.log(e),alert("orinoco momentanément indisponible :( b")})),"/produit.html"==window.location.pathname){var o=window.location.href,a=new URL(o).searchParams.get("id");fetch("http://localhost:3000/api/teddies/"+a).then((function(e){if(e.ok)return e.json();window.location.href="http://localhost:8080/"})).then((function(t){var o=new e(t._id,t.price,t.name,t.imageUrl,t.description,t.colors);document.getElementById("containerProduit").innerHTML+=o.getHtmlProduit(),document.getElementById("addPanier").addEventListener("click",(function(e){var o=document.getElementById("addColors").value;r.addProduct(t._id,t.name,t.price,o)}))})).catch((function(e){alert("orinoco momentanément indisponible :(")}))}var r=new t;if("/panier.html"==window.location.pathname){document.getElementById("clearPanier").addEventListener("click",(function(){localStorage.clear(),window.location.href="http://localhost:8080/panier.html"})),document.getElementById("total").innerHTML="<div><b>Total:</b>"+r.getTotal()/100+"€</div>";var n=document.getElementById("produits");for(let[e,t]of Object.entries(r.getProduits()))n.innerHTML+='<div class="produit"><div class="produitName"><span>'+t.name+"("+t.color+')</span></div><div class="produitQuantity">'+r.getHtmlQuantity(e,t.qty)+'</div><div class="produitPrice"><span>'+t.price/100+"€</span></div></div>";for(let[e,t]of Object.entries(r.getProduits()))document.getElementById(e).addEventListener("change",(function(t){r.setProductQty(e,document.getElementById(e).value),document.getElementById("total").innerHTML="<div><b>Total:</b>"+r.getTotal()/100+"€</div>"}));document.getElementById("cordonnees").addEventListener("submit",(function(e){e.preventDefault(),i.addCommande()}))}var i=new class{addCommande(){var e={};if(e.nom=document.querySelector('#cordonnees input[name="nom"]').value,e.prenom=document.querySelector('#cordonnees input[name="prenom"]').value,e.email=document.querySelector('#cordonnees input[name="email"]').value,e.postal=document.querySelector('#cordonnees input[name="postal"]').value,e.ville=document.querySelector('#cordonnees input[name="ville"] ').value,e.adresse=document.querySelector('#cordonnees input[name="adresse"]').value,0!=/^[A-Za-z]{2,20}$/.test(e.nom,e.prenom))if(0!=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.email))if(0!=/^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/.test(e.postal))if(0!=/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(e.ville))if(0!=/^[a-zA-Z0-9\s,.'-]{3,}$/.test(e.adresse)){var o=new t,a=[];for(let[e,t]of Object.entries(o.getProduits()))a.push(e.split("_")[0]);var r={contact:{firstName:e.prenom,lastName:e.nom,address:e.adresse,city:e.ville,email:e.email},products:a};fetch("http://localhost:3000/api/teddies/order",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(e){if(e.ok)return e.json()})).then((function(t){var a=t.orderId;localStorage.setItem("orderId",a);var r=localStorage.getItem("panier");localStorage.setItem("panierCommande",r),localStorage.setItem("totalCommande",o.getTotal()),localStorage.setItem("formulaire",JSON.stringify(e)),localStorage.removeItem("panier"),localStorage.removeItem("panierTotal"),window.location.href="http://localhost:8080/commande.html"}))}else alert("erreur adresse");else alert("erreur ville");else alert("erreur postal");else alert("erreur email");else alert("erreur prénon ou nom")}getCommande(){return{panier:JSON.parse(localStorage.getItem("panierCommande")),formulaire:JSON.parse(localStorage.getItem("formulaire")),total:JSON.parse(localStorage.getItem("totalCommande")),orderId:localStorage.getItem("orderId")}}};if("/commande.html"==window.location.pathname){var d=document.getElementById("commandes"),l="";for(let[e,t]of Object.entries(i.getCommande().panier))t.name,t.price,l=t.qty,console.log(l);d.innerHTML+='<h2>nous vous remerciant pour votre commande</h2><div class="commande"><h3>Détaille de la commande</h3><div class="detailleCommande"><div class="detailleNumeroCommande"><p>N° de commande :</p><p>'+i.getCommande().orderId+'</p></div><div class="detailleTotalCommande"><p>Total de la commande :</p><p>'+i.getCommande().total/100+'€</p></div></div></div><div class="commande"><h3>Adresse de livraison</h3><div class="adresseCommande"><div class="commandeNom"><p>Nom :</p><p>'+i.getCommande().formulaire.nom+'</p></div><div class="commandePrenom"><p>Prénom :</p><p>'+i.getCommande().formulaire.prenom+'</p></div><div class="commandeAdresse"><p>Adresse :</p><p>'+i.getCommande().formulaire.adresse+'</p></div><div class="commandeVille"><p>Ville :</p><p>'+i.getCommande().formulaire.ville+", "+i.getCommande().formulaire.postal+"</p></div></div></div>"}})();