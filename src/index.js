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
                                '<img class="produit-image"' + ' src="'  + this.imageUrl + '" alt="nounours">' +                             
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
                        '</div';
    }  
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
            var produit = new Produit(produitData._id, produitData.price, produitData.name, produitData.imageUrl, produitData.description, produitData.colors);
            var currentDiv = document.getElementById('container');
            currentDiv.innerHTML += produit.getHtml();
        }
    })
    .catch(function(err) {
    });
}


if(window.location.pathname == "/produit.html") {
    var str = window.location.href;
    var url = new URL(str);
    var productId = url.searchParams.get("id");
    fetch('http://localhost:3000/api/teddies/' + productId )
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
        currentDiv.innerHTML += produit.getHtmlProduit();
        var addPanier = document.getElementById('addPanier');
        addPanier.addEventListener('click', function() {        
            addPanier.innerHTML = "C'est ajouté a votre panier !";
            panier.addProduct(data._id,data.price);
        });
    })
    .catch(function(err) {
    });
}



if(window.location.pathname == "/commande.html") {
    document.getElementById('cordonnees'.).addEventListener('submit', function() {
        alert
    })


}





