import Produit from "./class/Produit";
import Panier from "./class/Panier";
import Commande from "./class/Commande";

//                   DEBUT PAGE INDEX                      // 
if(window.location.pathname == '/') {
    fetch('http://localhost:3000/api/teddies')
    .then(function(res) {
        if (res.ok) {
            return res.json();
        } else {
            alert('orinoco momentanément indisponible :( ');
        }
    })
    .then(function(data) {
        for(let produitData of data) {
            var produit = new Produit(produitData._id, produitData.price, produitData.name, produitData.imageUrl, produitData.description, produitData.colors );
            var currentDiv = document.getElementById('container');
            currentDiv.innerHTML += produit.getHtml();
        }
    })
    .catch(function(err) {
        console.log(err);
        alert('orinoco momentanément indisponible :(' );
    });
}
//                   FIN PAGE INDEX                      // 





//                   DEBUT PAGE PRODUIT                     // 
if(window.location.pathname == "/produit.html") {
    var str = window.location.href;
    var url = new URL(str);
    var productId = url.searchParams.get("id")
    fetch('http://localhost:3000/api/teddies/' + productId)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        } else {
            window.location.href = "http://localhost:8080/";
        }
    })
    .then(function(data) { 
        var produit = new Produit(data._id, data.price, data.name, data.imageUrl, data.description, data.colors);
        var currentDiv = document.getElementById('containerProduit');
        currentDiv.innerHTML += (produit.getHtmlProduit());
        var addPanier = document.getElementById('addPanier');
        addPanier.addEventListener('click', function (e) {
            var color = document.getElementById('addColors').value;
            panier.addProduct(data._id,data.name, data.price, color);
        });
    })
    .catch(function(err) {
        alert('orinoco momentanément indisponible :(')
    });
}
//                   FIN PAGE PRODUIT                     //







//                   DEBUT PAGE PANIER                    // 
var panier = new Panier();
if(window.location.pathname == "/panier.html") {
    var clearPanier = document.getElementById('clearPanier');
    clearPanier.addEventListener('click', function(){
        localStorage.clear();
        window.location.href = "http://localhost:8080/panier.html";
    });
    document.getElementById('total').innerHTML = '<div><b>Total:</b>' +  panier.getTotal()/100  + '€</div>' ;
    var produits = document.getElementById('produits');
    for (let [key, value] of Object.entries(panier.getProduits())) { 
        produits.innerHTML +=       '<div class="panierProduit">' +         
                                        '<div class="produitName">' +
                                            '<span>' + value.name + '(' + value.color + ')</span>' + 
                                        '</div>' +
                                        '<div class="panierProduitPriceQty">' +
                                            '<div class="produitPrice">' +
                                                '<span>' + value.price/100 + '€</span>' +
                                            '</div>' +
                                            '<div class="produitQuantity">' +
                                                panier.getHtmlQuantity(key,value.qty) +
                                            '</div>'+
                                        '</div>'+
                                    '</div>';                                              
    }
    for (let [key, value] of Object.entries(panier.getProduits())) {   
        document.getElementById(key).addEventListener('change', function (event) {
            panier.setProductQty(key, document.getElementById(key).value);
            document.getElementById('total').innerHTML = '<div><b>Total:</b>  ' +  panier.getTotal()/100  + '€</div>' ;        
        });
    }
    document.getElementById('cordonnees').addEventListener('submit', function(event) {
        event.preventDefault();
        if (panier.getTotal()/100 == 0) {
            alert('votre panier est vide :(')
        } else {
            commande.addCommande();
        }
        
    })
}
//                  FIN PAGE PANIER                    // 








//                   DEBUT PAGE COMMANDE                    // 
var commande = new Commande();
if(window.location.pathname == "/commande.html") {
    var currentDiv = document.getElementById('commandes');
    var produitHtmlName ='';
    var produitHtmlPrice ='';
    var produitHtmlQty ='';
    for (let [key, value] of Object.entries(commande.getCommande().panier)) {
        produitHtmlName = value.name 
        produitHtmlPrice = value.price
        produitHtmlQty = value.qty
        console.log(produitHtmlQty)
    }
    currentDiv.innerHTML +=     '<div class="commande">'+
                                    '<h2>'+
                                        'Détail de la commande'+
                                    '</h2>'+
                                    '<div class="detailsCommande commandeP">'+
                                        '<div class="detailCommande commandeNumero">'+
                                            '<p>'+
                                                'N° de commande :'+
                                            '</p>'+
                                            '<p>'+ 
                                                commande.getCommande().orderId +
                                            '</p>' +
                                        '</div>' +
                                        '<div class="detailCommande  commandeTotal">' +
                                            '<p>' +
                                                'Total de la commande :' +
                                            '</p>' +
                                            '<p>' +
                                                commande.getCommande().total/100 + '€' +
                                            '</p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="commande">' +
                                    '<h2>' +
                                        'Adresse de livraison' +
                                    '</h2>' +
                                    '<div class="adresseCommande">' +
                                        '<div class="commandeNom">' +
                                            '<p class="commandeP">' +
                                                'Nom :' +
                                            '</p>' +
                                            '<p>' +
                                                commande.getCommande().formulaire.nom +
                                            '</p>' +
                                        '</div>' +
                                        '<div class="commandePrenom">' +
                                            '<p class="commandeP">' +
                                                'Prénom :' +
                                            '</p>' +
                                            '<p>' +
                                                commande.getCommande().formulaire.prenom +
                                            '</p>' +
                                        '</div>' +
                                        '<div class="commandeAdresse">' +
                                            '<p class="commandeP">' +
                                                'Adresse :' +
                                            '</p>' +
                                            '<p>' +
                                                commande.getCommande().formulaire.adresse +
                                            '</p>' +
                                        '</div>' +
                                        '<div class="commandeVille">' +
                                            '<p class="commandeP">' +
                                                'Ville :' +
                                            '</p>' +
                                            '<p>' +
                                                commande.getCommande().formulaire.ville + ', ' + commande.getCommande().formulaire.postal +
                                            '</p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' ;
}
//                   FIN PAGE COMMANDE                     // 




    



