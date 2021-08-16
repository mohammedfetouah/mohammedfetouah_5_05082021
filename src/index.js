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
    getHtmlPanier() {

    }
}

class Panier {
    addProduct(productId, productPrice) {
        var panierLocal = localStorage.getItem('panier');
        if(panierLocal) {
            panierLocal = JSON.parse(panierLocal);
        }else {
            panierLocal = [];
        }
        panierLocal.push(productId);
        localStorage.setItem('panier', JSON.stringify(panierLocal));

        var panierTotal = localStorage.getItem('panierTotal');
        if(panierTotal) {
            panierTotal = parseInt(panierTotal);
            panierTotal += parseInt(productPrice);
            localStorage.setItem('panierTotal', panierTotal);
        } else {
            localStorage.setItem('panierTotal', productPrice);
        }
    }
    getProduits() {
        var panierLocal = localStorage.getItem('panier');
        return JSON.parse(panierLocal);
    }
    getTotal() {
        return localStorage.getItem('panierTotal');
    }

}


var panier = new Panier();

if(window.location.pathname == '/') {
    fetch('http://localhost:3000/api/teddies')
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        for(produitData of data) {
            var produit = new Produit(produitData._id, produitData.price, produitData.name, produitData.imageUrl, produitData.description, produitData.colors);
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
         panier.addProduct(data._id, data.price);
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
    if (panier.getProduits()) {
        
        document.getElementById('total').innerHTML += '<div><b>Total panier : </b>' + (panier.getTotal()/100) + '€</div>';
        var productQty = {};
        var productIds = [];
        for(productId of panier.getProduits()) {
            if (productQty[productId]) {
                productQty[productId] += 1;
            } else {
                productQty[productId] = 1;
                productIds.push(productId);
            }
        }
        for(productId of productIds) {
  
            fetch('http://localhost:3000/api/teddies/' + productId)
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                } else {
                    window.location.href = "http://localhost:8080/";
                }
            })
            .then(function(data) {
                var currentDiv = document.getElementById('produits');
                currentDiv.innerHTML += '<div class="produit">' +
                                            '<span class="name">' + data.name + '</span>'  +                
                                            '<span class="qty"> '+ productQty[data._id] +' </span>' +  
                                        '</div>';
    
            })
            .catch(function(err) {
            });

            
        }


    }
    document.getElementById('cordonnees').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('ok');
    })
}

if(window.location.pathname == "/commande.html") {
    var products = [];
    
}


