(()=>{class t{constructor(t,e,i,a,o,n){this._id=t,this.price=e,this.name=i,this.imageUrl=a,this.description=o,this.colors=n}getHtml(){return'<a href="produit.html?id='+this._id+'" class="produits"> <div><img class="produit-image" src="'+this.imageUrl+'" alt="nounours"></div><div class="produit-description"><div class="produit-name"><span>'+this.name+'</span></div> <div class="produit-price">  <span> '+this.price/100+"€</span></div></div></a>"}getHtmlProduit(){var t="";for(let e of this.colors)t+='<option value="'+e+'">'+e+"</option>";return'<div class="produit"> <div><img class="produit-image" src="'+this.imageUrl+'" alt="nounours"></div><div class="produit-description"><div class="produit-name"><span>'+this.name+'</span></div> <div class="produit-price">     <span> '+this.description+'</span></div> <div class="produit-price">  <span> '+this.price/100+'€</span></div><select name="colors">'+t+'</select><button id="addPanier">  ajouter au panier </button></div>'}}var e=new class{addProduct(t,e){var i=localStorage.getItem("panier");(i=i?JSON.parse(i):[]).push(t),localStorage.setItem("panier",JSON.stringify(i));var a=localStorage.getItem("panierTotal");a?(a=parseInt(a),a+=parseInt(e),localStorage.setItem("panierTotal",a)):localStorage.setItem("panierTotal",e)}getProduits(){var t=localStorage.getItem("panier");return JSON.parse(t)}getTotal(){return localStorage.getItem("panierTotal")}};if("/"==window.location.pathname&&fetch("http://localhost:3000/api/teddies").then((function(t){if(t.ok)return t.json()})).then((function(e){for(produitData of e){var i=new t(produitData._id,produitData.price,produitData.name,produitData.imageUrl,produitData.description,produitData.colors);document.getElementById("container").innerHTML+=i.getHtml()}})).catch((function(t){})),"/produit.html"==window.location.pathname){var i=window.location.href,a=new URL(i).searchParams.get("id");fetch("http://localhost:3000/api/teddies/"+a).then((function(t){if(t.ok)return t.json();window.location.href="http://localhost:8080/"})).then((function(i){var a=new t(i._id,i.price,i.name,i.imageUrl,i.description,i.colors);document.getElementById("containerProduit").innerHTML+=a.getHtmlProduit(),document.getElementById("addPanier").addEventListener("click",(function(t){e.addProduct(i._id,i.price)}))})).catch((function(t){}))}if("/panier.html"==window.location.pathname){if(document.getElementById("clearPanier").addEventListener("click",(function(){localStorage.clear(),window.location.href="http://localhost:8080/panier.html"})),e.getProduits())for(a of(document.getElementById("total").innerHTML+="<div><b>Total panier : </b>"+e.getTotal()/100+"€</div>",console.log(e.getProduits()),e.getProduits()));document.getElementById("cordonnees").addEventListener("submit",(function(t){t.preventDefault(),alert("ok")}))}window.location.pathname})();