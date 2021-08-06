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
        var newDiv = document.createElement("div");
        var newImg = document.createElement("img");
        newImg.setAttribute("src",this.imageUrl);
        newImg.setAttribute("alt","image de " + this.name);
        newDiv.appendChild(newImg);
        return newDiv;

    }
}
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
        currentDiv.appendChild(produit.getHtml());
    }
})
.catch(function(err) {
});










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






