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
                                    ' <span> ' + this.price + '</span>' +
                                '</div>' + 
                            '</div>' +
                        '</a>';

    }
    getHtmlProduit() {
        return          '<a href="produit.html?id=' + this._id +  '" class="produits"> ' +
                            '<div>' +
                                '<img class="produit-image"' + ' src="'  + this.imageUrl + '" alt="nounours">' +                             
                            '</div>' +
                            '<div class="produit-description">' +
                                '<div class="produit-name">' +
                                    '<span>' + this.name + '</span>' +
                                '</div>' +
                                ' <div class="produit-price"> ' + 
                                    ' <span> ' + this.price + '</span>' +
                                '</div>' + 
                                '<div class="produit-name">' +
                                    '<span>' + this.colors + '</span>' +
                                '</div>' +
                                ' <div class="produit-price"> ' + 
                                    ' <span> ' + this.description + '</span>' +
                                '</div>' +
                            '</div>' +
                        '</a>';
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
            console.log(produit.getHtml());
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
        }
        })
        .then(function(data) { 
            var produit = new Produit(data._id, data.price, data.name, data.imageUrl, data.description, data.colors);
            var currentDiv = document.getElementById('containerProduit');
            currentDiv.innerHTML += produit.getHtmlProduit();
            console.log(produit.getHtmlProduit());
        })
        .catch(function(err) {
            return 'http://localhost:3000/api/teddies/';
        });
}











// fetch('http://localhost:3000/api/teddies')
//     .then(function(response){
//     return response.json();
// }).then(function(data){
//     console.log(data)
// });



        // // création de variable qui récupere l'element du dom ('contenu') 
        // var contenuElement = document.getElementById('content');
        // // création de variable qui récupere l'element du dom ('contenu')
         



        // //  création de boucle for of

        // }
        // //  création de boucle for of


        // var newA = document.createElement("a");
        // var newDivImg = document.createElement('div');
        // var newImg = document.createElement("img");
        // var newDivDescription = document.createElement("div");
        
        // newImg.setAttribute("src",this.imageUrl);
        // newImg.setAttribute("alt","image de " + this.name);
        // newA.setAttribute('href', 'produit.html?id= ' + this._id);
        // newDivImg.appendChild(newImg);
        // newA.appendChild(newDivImg);
        // return newA;



