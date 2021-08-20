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
                                '<select name="colors">' + colorHtml + '</select>' + 
                                '<button id="addPanier">  ajouter au panier </button>' +
                            '</div>';
    }  
    getHtmlQuantity() {
        return                  '<select name="quantite" id="addQuantity">' +
                                    '<option value="1">1</option>' +
                                    '<option value="2">2</option>' + 
                                    '<option value="3">3</option>' +
                                    '<option value="4">4</option>' +
                                    '<option value="5">5</option>' +
                                    '<option value="6">6</option>' +
                                    '<option value="7">7</option>' +
                                    '<option value="8">8</option>' +
                                    '<option value="9">9</option>' +
                                    '<option value="10">10</option>' +
                                '</select>';

    }
    
}

class Panier {
    addProduct(productId, productPrice, productColors) {

        var panierColors = localStorage.getItem('colors')
        if(panierColors) {
            panierColors = JSON.parse(panierColors)
        } else {
            panierColors = [];
        }
        panierColors.push(productColors);
        localStorage.setItem('colors', JSON.stringify(panierColors))



        
        var panierLocal = localStorage.getItem('panier');
        if(panierLocal) {
            panierLocal = JSON.parse(panierLocal);
        }else {
            panierLocal = [];
        }
        for( var i = 1; i < quantity; i++) {
            panierLocal.push(productId)
        }
        panierLocal.push(productId);
        localStorage.setItem('panier', JSON.stringify(panierLocal));

        

        var panierTotal = localStorage.getItem('panierTotal');
        if(panierTotal) {
            panierTotal = parseInt(panierTotal);
            panierTotal += parseInt(productPrice)*quantity;
            localStorage.setItem('panierTotal', panierTotal);
        
        } else {
            localStorage.setItem('panierTotal', productPrice*quantity);
        }




    }
    getProduits() {
        var panierLocal = localStorage.getItem('panier');
        return JSON.parse(panierLocal);
    }
    getTotal() {
        return localStorage.getItem('panierTotal');
    }
    getQuantity() {
        return localStorage.getItem('quantite');
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
            panier.addProduct(data._id, data.price, data.colors);

            window.location.href = "http://localhost:8080/";
            window.alert("l'article a bien était ajoutée au panier !");
           
        });
    })
    .catch(function(err) {

    });
}







// if(window.location.pathname == "/panier.html") {
    
//     var clearPanier = document.getElementById('clearPanier');
//     clearPanier.addEventListener('click', function(){
//         localStorage.clear();
//         window.location.href = "http://localhost:8080/panier.html";
//     });
//     if (panier.getProduits()) {
        
//         document.getElementById('total').innerHTML += '<div><b>Total panier : </b>' + (panier.getTotal()/100) + '€</div>';
//         var productQty = {};
//         var productIds = [];
//         for(productId of panier.getProduits()) {
//             if (productQty[productId]) {
//                 productQty[productId] += 1;
//             } else {
//                 productQty[productId] = 1;
//                 productIds.push(productId);
//             }
//         }
//         for(productId of productIds) {
  
//             fetch('http://localhost:3000/api/teddies/' + productId)
//             .then(function(res) {
//                 if (res.ok) {
//                     return res.json();
//                 } else {
//                     window.location.href = "http://localhost:8080/";
//                 }
//             })
//             .then(function(data) {
//                 var currentDiv = document.getElementById('produits');
//                 // currentDiv.innerHTML += 
                                                           
//                                             // '<span class="qty"> '+ productQty[data._id] +' </span>' +  
                                        
                                        
//             })
//             .catch(function(err) {
//             });
//         }
        


//     }
//     document.getElementById('cordonnees').addEventListener('submit', function(event) {

//         event.preventDefault();
//         commande.addCommande()
   


//         window.location.href = "http://localhost:8080/commande.html";
//     })

// }







// if(window.location.pathname == "/commande.html") {
//     var currentDiv = document.getElementById('commande');
//     currentDiv.innerHTML += '<h1>' + commande.getCommande().formulaire.nom + '</h1>';
//     console.log(commande.getCommande());


// }



    



