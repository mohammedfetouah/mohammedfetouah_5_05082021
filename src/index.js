class Produit {
    constructor(_id, price, name, imageUrl, description, colors) {
        this._id = _id;
        this.price = price;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.colors = colors;
    }
    getHtml () {
        return         '<a href="produit.html?id=' + this._id +  '" class="produits"> ' +
                            '<div>' +
                                '<img class="produit-image"' + ' src="'  + this.imageUrl + '" alt="nounours">' +                             
                            '</div>' +
                            '<div class="produit-description">' +
                                '<div class="produit-name">' +
                                    '<span>' + this.name + '</span>' +
                                '</div>' +
                                ' <div class="produit-price"> ' + 
                                    ' <span> ' + this.price/100 + '€</span>' +
                                '</div>' + 
                            '</div>' +
                        '</a>';
    }

    getHtmlProduit() {
        var colorHtml = '';
        for (let color of this.colors) {
            colorHtml += '<option value="' + color + '">' + color +'</option>';
        }

        return          '<div class="produit"> ' +
                            '<div>' +
                                '<img class="produit-image" src="'  + this.imageUrl + '" alt="nounours">' +                             
                            '</div>' +
                            '<div class="produit-description">' +
                                '<div class="produit-name">' +
                                    '<span>' + this.name + '</span>' +
                                '</div>' +
                                ' <div class="produit-price"> ' + 
                                '    <span> ' + this.description + '</span>' +
                                '</div>' +
                                ' <div class="produit-price"> ' + 
                                    ' <span> ' + this.price/100 + '€</span>' +
                                '</div>' + 
                                '<select name="colors" id="addColors">' + colorHtml + '</select>' + 
                            '</div>' +
                            '<button id="addPanier">  ajouter au panier </button>' +
                        '</div>';
    }  
    
}
// 5beaa8bf1c9d440000a57d94_white: {
//     name: 'Arnold',
//     qty: 1,
//     price: 5000
// },
class Panier {
    addProduct(productId, productName, productPrice, productColor) {
        var productColorKey = productColor.toLowerCase().replace(' ', '_');
        var productKey = productId + '_' + productColorKey;
        console.log(productKey);
        
        var panierLocal = localStorage.getItem('panier');
        if(panierLocal) {
            panierLocal = JSON.parse(panierLocal);
        }else {
            panierLocal = {};
        }
        panierLocal[productKey] = {
            name : productName,
            qty : 1,
            color : productColor,
            price : productPrice,
        };
        
        localStorage.setItem('panier', JSON.stringify(panierLocal));
    }
    getProduits() {
        var panierLocal = localStorage.getItem('panier');
        return JSON.parse(panierLocal);
    }
    getTotal() {
        var total = 0;
        for (let [key, value] of Object.entries(this.getProduits())) {
            total += value.price*value.qty;
        }
        return total;
    }
    getColors() {
        return localStorage.getItem('colors');
    }
    getHtmlQuantity(productKey, qty) {
        var html = '<select name="quantite" id="' + productKey + '">';
        for (var i = 1;i<=10;i++) {
            if (i == qty) {
                html +=  '<option value="'+ i + '" selected>' + i + '</option>';
            } else {
                html +=  '<option value="'+ i + '">' + i + '</option>';
            }
            
        }
        html += '</select>';

        return html;
    }

}
var panier = new Panier();
var commande = new Commande();

class Commande {
     addCommande() {

        var formulaire = {};

        formulaire.nom = document.querySelector('#cordonnees input[name="nom"]').value
        formulaire.prenom = document.querySelector('#cordonnees input[name="prenom"]').value
        formulaire.email = document.querySelector('#cordonnees input[name="email"]').value
        formulaire.postal = document.querySelector('#cordonnees input[name="postal"]').value
        formulaire.ville = document.querySelector('#cordonnees input[name="ville"] ').value
        formulaire.adresse = document.querySelector('#cordonnees input[name="adresse"]' ).value


        localStorage.setItem('formulaire', JSON.stringify(formulaire));



        var panierCommande = localStorage.getItem('panier');
        var totalCommande = localStorage.getItem('panierTotal');
        localStorage.setItem('panierCommande', panierCommande)
        localStorage.setItem('totalCommande', totalCommande)
        localStorage.removeItem('panier');
        localStorage.removeItem('panierTotal');








    }
    getCommande() {
        console.log(localStorage.getItem('formulaire').nom);
        var commandes = {
            panier : JSON.parse(localStorage.getItem('panierCommande')),
            formulaire : JSON.parse(localStorage.getItem('formulaire')),
            total : JSON.parse(localStorage.getItem('totalCommande')),
        };




        
        return commandes;


        
    };

        
    

    

}











if(window.location.pathname == '/') {
    fetch('http://localhost:3000/api/teddies')
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        for(produitData of data) {
            var produit = new Produit(produitData._id, produitData.price, produitData.name, produitData.imageUrl, produitData.description, produitData.colors );
            var currentDiv = document.getElementById('container');
            currentDiv.innerHTML += produit.getHtml();
        }
    })
    .catch(function(err) {
    });
}


// PAGE PRODUIT

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

    });
}


if(window.location.pathname == "/panier.html") {
    
    var clearPanier = document.getElementById('clearPanier');
    clearPanier.addEventListener('click', function(){
        localStorage.clear();
        window.location.href = "http://localhost:8080/panier.html";
    });
    for (let [key, value] of Object.entries(panier.getProduits())) {
        // Ajouté ligne dans le panier avec  Nom (couleur) selectQty et prix
        // ajouter eventListener change select 
    }

    var total = document.getElementById('total').innerHTML = '<div><b>Total:</b>' +  panier.getTotal()/100  + '€</div>' ; 
    document.getElementById('cordonnees').addEventListener('submit', function(event) {
        event.preventDefault();
        commande.addCommande()
        window.location.href = "http://localhost:8080/commande.html";
    })

}







// if(window.location.pathname == "/commande.html") {
//     var currentDiv = document.getElementById('commande');
//     currentDiv.innerHTML += '<h1>' + commande.getCommande().formulaire.nom + '</h1>';
//     console.log(commande.getCommande());


// }



    



