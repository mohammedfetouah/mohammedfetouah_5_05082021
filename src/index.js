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
    setProductQty(productKey, qty) {
        var panierLocal = localStorage.getItem('panier');
        panierLocal = JSON.parse(panierLocal);
        panierLocal[productKey].qty = qty;
    
        localStorage.setItem('panier', JSON.stringify(panierLocal))






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


        
        if (/^[A-Za-z]{2,20}$/.test(formulaire.nom, formulaire.prenom ) == false) {
            alert('erreur prenon ou nom')
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
        if (regexAdresse.test(formulaire.ville) == false) {
            alert('erreur adresse')
            return;
        }




        
        

        // Ici le formulaire est OK
        // Ajouter un numeroCommande dans le localStorage
        // Le récupérer grace à l'api 

        // contact: {
        //  firstName: string,
        //  lastName: string,
        //  address: string,
        //  city: string,
        //     *   email: string
        //     * }
        //     * products: ['tsgfysiqf','sugfhdsgdsg','ghuihbkjjn']


        var panierCommande = localStorage.getItem('panier');
        localStorage.setItem('panierCommande', panierCommande);
        localStorage.setItem('totalCommande', panier.getTotal());
        localStorage.setItem('formulaire', JSON.stringify(formulaire));

        localStorage.removeItem('panier');
        localStorage.removeItem('panierTotal');





        // window.location.href = "http://localhost:8080/commande.html";
    }
    getCommande() {
        var commande = {
            panier : JSON.parse(localStorage.getItem('panierCommande')),
            formulaire : JSON.parse(localStorage.getItem('formulaire')),
            total : JSON.parse(localStorage.getItem('totalCommande')),
        };
        
        return commande;
        
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
    document.getElementById('total').innerHTML = '<div><b>Total:</b>' +  panier.getTotal()/100  + '€</div>' ;
    var produits = document.getElementById('produits');
    for (let [key, value] of Object.entries(panier.getProduits())) {
        
        produits.innerHTML +=           '<div class="produit">' +
                                            '<span>' + value.name + (value.color) + '</span>' + 
                                            panier.getHtmlQuantity(key,value.qty) +
                                            '<span>' + value.price + '€</span>' +
                                        '</div>';
                                        
                                        
                                    
    }
    for (let [key, value] of Object.entries(panier.getProduits())) {

        
        
        document.getElementById(key).addEventListener('change', function (event) {
            panier.setProductQty(key, document.getElementById(key).value);


            document.getElementById('total').innerHTML = '<div><b>Total:</b>' +  panier.getTotal()/100  + '€</div>' ;
             
        });

    }

    
    document.getElementById('cordonnees').addEventListener('submit', function(event) {
        event.preventDefault();
        commande.addCommande();
    })

}







if(window.location.pathname == "/commande.html") {
    var currentDiv = document.getElementById('commande');
    //currentDiv.innerHTML += '<h1>' + commande.getCommande().formulaire.nom + '</h1>';
    console.log(commande.getCommande());
}



    



