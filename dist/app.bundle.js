(()=>{class e{constructor(e,t,o,a,n,r){this._id=e,this.price=t,this.name=o,this.imageUrl=a,this.description=n,this.colors=r}getHtml(){return'<div class="row"><div class="col-sm-12" ><a href="produit.html?id='+this._id+'" class="produits"> <div class="produit"><div><img class="produit-image" src="'+this.imageUrl+'" alt="nounours"></div><div class="produit-description"><div class="produit-name"><span>'+this.name+'</span></div><div class="produit-price">  <span> '+this.price/100+"€</span></div></div></div></a></div></div>"}getHtmlProduit(){var e="";for(let t of this.colors)e+='<option value="'+t+'">'+t+"</option>";return'<div class="produit"> <div><img class="produit-image" src="'+this.imageUrl+'" alt="nounours"></div><div class="produit-description"><div class="produit-name"><span>'+this.name+'</span></div> <div class="produit-price">     <span> '+this.description+'</span></div> <div class="produit-price">  <span> '+this.price/100+'€</span></div><select name="colors" id="addColors">'+e+'</select></div><button id="addPanier">  ajouter au panier </button></div>'}}if("/"==window.location.pathname&&fetch("http://localhost:3000/api/teddies").then((function(e){if(e.ok)return e.json();alert("orinoco momentanément indisponible :(")})).then((function(t){for(produitData of t){var o=new e(produitData._id,produitData.price,produitData.name,produitData.imageUrl,produitData.description,produitData.colors);document.getElementById("container").innerHTML+=o.getHtml()}})).catch((function(e){alert("orinoco momentanément indisponible :(")})),"/produit.html"==window.location.pathname){var t=window.location.href,o=new URL(t).searchParams.get("id");fetch("http://localhost:3000/api/teddies/"+o).then((function(e){if(e.ok)return e.json();window.location.href="http://localhost:8080/"})).then((function(t){var o=new e(t._id,t.price,t.name,t.imageUrl,t.description,t.colors);document.getElementById("containerProduit").innerHTML+=o.getHtmlProduit(),document.getElementById("addPanier").addEventListener("click",(function(e){var o=document.getElementById("addColors").value;a.addProduct(t._id,t.name,t.price,o)}))})).catch((function(e){alert("orinoco momentanément indisponible :(")}))}var a=new class{addProduct(e,t,o,a){var n=e+"_"+a.toLowerCase().replace(" ","_");console.log(n);var r=localStorage.getItem("panier");(r=r?JSON.parse(r):{})[n]={name:t,qty:1,color:a,price:o},localStorage.setItem("panier",JSON.stringify(r))}setProductQty(e,t){var o=localStorage.getItem("panier");(o=JSON.parse(o))[e].qty=t,localStorage.setItem("panier",JSON.stringify(o))}getProduits(){var e=localStorage.getItem("panier");return JSON.parse(e)}getTotal(){var e=0;for(let[t,o]of Object.entries(this.getProduits()))e+=o.price*o.qty;return e}getColors(){return localStorage.getItem("colors")}getHtmlQuantity(e,t){for(var o='<select name="quantite" id="'+e+'">',a=1;a<=10;a++)o+=a==t?'<option value="'+a+'" selected>'+a+"</option>":'<option value="'+a+'">'+a+"</option>";return o+"</select>"}};if("/panier.html"==window.location.pathname){document.getElementById("clearPanier").addEventListener("click",(function(){localStorage.clear(),window.location.href="http://localhost:8080/panier.html"})),document.getElementById("total").innerHTML="<div><b>Total:</b>"+a.getTotal()/100+"€</div>";var n=document.getElementById("produits");for(let[e,t]of Object.entries(a.getProduits()))n.innerHTML+='<div class="produit"><span>'+t.name+"("+t.color+")</span>"+a.getHtmlQuantity(e,t.qty)+"<span>"+t.price+"€</span></div>";for(let[e,t]of Object.entries(a.getProduits()))document.getElementById(e).addEventListener("change",(function(t){a.setProductQty(e,document.getElementById(e).value),document.getElementById("total").innerHTML="<div><b>Total:</b>"+a.getTotal()/100+"€</div>"}));document.getElementById("cordonnees").addEventListener("submit",(function(e){e.preventDefault(),r.addCommande()}))}else alert("orinoco momentanément indisponible :(");var r=new class{addCommande(){var e={};if(e.nom=document.querySelector('#cordonnees input[name="nom"]').value,e.prenom=document.querySelector('#cordonnees input[name="prenom"]').value,e.email=document.querySelector('#cordonnees input[name="email"]').value,e.postal=document.querySelector('#cordonnees input[name="postal"]').value,e.ville=document.querySelector('#cordonnees input[name="ville"] ').value,e.adresse=document.querySelector('#cordonnees input[name="adresse"]').value,0!=/^[A-Za-z]{2,20}$/.test(e.nom,e.prenom))if(0!=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.email))if(0!=/^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/.test(e.postal))if(0!=/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(e.ville))if(0!=/^[a-zA-Z0-9\s,.'-]{3,}$/.test(e.adresse)){var t=[];for(let[e,o]of Object.entries(a.getProduits()))t.push(e.split("_")[0]);var o={contact:{firstName:e.prenom,lastName:e.nom,address:e.adresse,city:e.ville,email:e.email},products:t};fetch("http://localhost:3000/api/teddies/order",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(o)}).then((function(e){if(e.ok)return e.json()})).then((function(t){var o=t.orderId;localStorage.setItem("orderId",o);var n=localStorage.getItem("panier");localStorage.setItem("panierCommande",n),localStorage.setItem("totalCommande",a.getTotal()),localStorage.setItem("formulaire",JSON.stringify(e)),localStorage.removeItem("panier"),localStorage.removeItem("panierTotal"),window.location.href="http://localhost:8080/commande.html"}))}else alert("erreur adresse");else alert("erreur ville");else alert("erreur postal");else alert("erreur email");else alert("erreur prénon ou nom")}getCommande(){return{panier:JSON.parse(localStorage.getItem("panierCommande")),formulaire:JSON.parse(localStorage.getItem("formulaire")),total:JSON.parse(localStorage.getItem("totalCommande")),orderId:localStorage.getItem("orderId")}}};if("/commande.html"==window.location.pathname){var i=document.getElementById("commandes"),d="";for(let[e,t]of Object.entries(r.getCommande().panier))t.name,t.price,d=t.qty,console.log(d);i.innerHTML+='<h2>nous vous remerciant pour votre commande</h2><div class="commande"><h3>Détaille de la commandes</h3><div class="detailleCommande"><div><p>N° de commande :</p><p>'+r.getCommande().orderId+"</p></div><div><p>Total de la commande :</p><p>"+r.getCommande().total/100+'€</p></div></div></div><div class="commande"><h3>Adresse de livraison</h3><div class="adresseCommande"><div><p>Nom :</p><p>'+r.getCommande().formulaire.nom+"</p></div><div><p>Prénom :</p><p>"+r.getCommande().formulaire.prenom+"</p></div><div><p>Adresse :</p><p>"+r.getCommande().formulaire.adresse+"</p></div><div><p>Ville :</p><p>"+r.getCommande().formulaire.ville+", "+r.getCommande().formulaire.postal+"</p></div></div></div>"}else alert("orinoco momentanément indisponible :(")})();