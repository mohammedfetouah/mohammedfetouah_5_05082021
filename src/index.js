
class Produit {
    constructor(_id, price, name, imageUrl, description, colors) {
        this._id = _id;
        this.price = price;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.colors = colors;
    }
    // getHtml () {
    //     return 
    // }
}

// création de tableau variable
let produits = [
    new Produit ("5be9c8541c9d440000665243", 2900, "Norbert", "http://localhost:3000/images/teddy_1.jpg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ["Tan", "Chocolate", "Black", "White"]),
    new Produit ("5beaa8bf1c9d440000a57d94", 3900, "Arnold", "http://localhost:3000/images/teddy_2.jpg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ["Pale brown", "Dark brown", "White"]),
    new Produit ("5beaaa8f1c9d440000a57d95", 5900, "Lenny and Carl", "http://localhost:3000/images/teddy_3.jpg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ["Brown"]),
    new Produit ("5beaabe91c9d440000a57d96", 4500, "Gustav", "http://localhost:3000/images/teddy_4.jpg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ["Brown", "Blue", "Pink"]),
    new Produit ("5beaacd41c9d440000a57d97", 5500, "Garfunkel", "http://localhost:3000/images/teddy_5.jpg", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", ["Beige", "Tan", "Chocolate"]),
];// création de tableau variable




        // création de variable qui récupere l'element du dom ('contenu') 
        var contenuElement = document.getElementById('#');
        // création de variable qui récupere l'element du dom ('contenu')
         



        //  création de boucle for of
        for(produit of produits) {
            contenuElement.innerHTML += produit.getHtml();
        }
        //  création de boucle for of





fetch('http://localhost:3000/api/teddies').then(function(res){
    return res.json();
}).then(function(data){
    console.log(data)
});


