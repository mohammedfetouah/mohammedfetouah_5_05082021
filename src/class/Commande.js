import Panier from './Panier'
export default class Commande {
    addCommande() {
       var formulaire = {};
       formulaire.nom = document.querySelector('#cordonnees input[name="nom"]').value
       formulaire.prenom = document.querySelector('#cordonnees input[name="prenom"]').value
       formulaire.email = document.querySelector('#cordonnees input[name="email"]').value
       formulaire.postal = document.querySelector('#cordonnees input[name="postal"]').value
       formulaire.ville = document.querySelector('#cordonnees input[name="ville"] ').value
       formulaire.adresse = document.querySelector('#cordonnees input[name="adresse"]' ).value

       if (/^[A-Za-z]{2,20}$/.test(formulaire.nom, formulaire.prenom ) == false) {
           alert('erreur prénon ou nom')
           return;
       }
       const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if (regexEmail.test(formulaire.email) == false) {
           alert('erreur email')
           return;
       }
       const regexPostal = /^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/;
       if (regexPostal.test(formulaire.postal) == false) {
           alert('erreur postal')
           return;
       }

       const regexVille = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
       if (regexVille.test(formulaire.ville) == false) {
           alert('erreur ville')
           return;
       }
       const regexAdresse = /^[a-zA-Z0-9\s,.'-]{3,}$/;
       if (regexAdresse.test(formulaire.adresse) == false) {
           alert('erreur adresse')
           return;
       }
       var panier = new Panier();
       var products = [];
       for (let [key, value] of Object.entries(panier.getProduits()))  {
           products.push(key.split('_')[0]);
       }

       var jsonBody = {
           contact: {
               firstName: formulaire.prenom,
               lastName: formulaire.nom,
               address: formulaire.adresse,
               city: formulaire.ville,
               email: formulaire.email,
           },
           products: products,
       };
       fetch('http://localhost:3000/api/teddies/order', {
           method: 'POST',
           headers: { 
               'Accept': 'application/json', 
               'Content-Type': 'application/json' 
           },
           body: JSON.stringify(jsonBody)
       }).then(function(res) {
           if (res.ok) {
               return res.json();
           }
       })
       .then(function(data)  {
           var orderId = data.orderId;
           localStorage.setItem('orderId', orderId);
           var panierCommande = localStorage.getItem('panier');
           localStorage.setItem('panierCommande', panierCommande);
           localStorage.setItem('totalCommande', panier.getTotal());
           localStorage.setItem('formulaire', JSON.stringify(formulaire));
           localStorage.removeItem('panier');
           localStorage.removeItem('panierTotal');
           window.location.href = "http://localhost:8080/commande.html";
       });       
   }
   getCommande() {
       var commande = {
           panier : JSON.parse(localStorage.getItem('panierCommande')),
           formulaire : JSON.parse(localStorage.getItem('formulaire')),
           total : JSON.parse(localStorage.getItem('totalCommande')),
           orderId: localStorage.getItem('orderId')  
       };
       return commande;
   };
}