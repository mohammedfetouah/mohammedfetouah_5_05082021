export default class Produit {
    constructor(_id, price, name, imageUrl, description, colors) {
        this._id = _id;
        this.price = price;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.colors = colors;
    }
    getHtml () {
        return      '<div class="produitsOrinoco col-lg-4" >' +
                        '<a href="produit.html?id=' + this._id +  '" class="produits"> ' +
                            '<div class="produit card">' +
                                '<div>' +
                                    '<img class="produit-image card-img-top"' + ' src="'  + this.imageUrl + '" alt="nounours">' +                             
                                '</div>' +
                                '<div class="produit-description card-body">' +
                                    '<div class="produit-name">' +
                                        '<span>' + this.name + '</span>' +
                                    '</div>' +
                                    '<div class="produit-price"> ' + 
                                        ' <span> ' + this.price/100 + '€</span>' +
                                    '</div>' + 
                                '</div>' +
                            '</div>' +
                        '</a>' +
                    '</div>' ;
    }
    getHtmlProduit() {
        var colorHtml = '';
        for (let color of this.colors) {
            colorHtml += '<option value="' + color + '">' + color +'</option>';
        }
                 
        return          '<div class="produitCard row">' +
                            '<div class="col-sm-4">' +
                                '<div class="produit card"> ' +
                                    '<div>' +
                                        '<img class="produit-image card-img-top" src="'  + this.imageUrl + '" alt="nounours">' +                             
                                    '</div>' +
                                    '<div class="produit-description card-body">' +
                                        '<div class="produit-name">' +
                                            '<span>' + this.name + '</span>' +
                                        '</div>' +
                                        ' <div class="produit-price"> ' + 
                                            ' <span> ' + this.price/100 + '€</span>' +
                                        '</div>' + 
                                    '</div>' +
                                    ' <div class="produit-presentation"> ' + 
                                    '    <span> ' + this.description + '</span>' +
                                    '</div>' +
                                    '<select name="colors" id="addColors">' + colorHtml + '</select>' + 
                                    '<button id="addPanier" class="btn btn-secondary">  ajouter au panier </button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

    }  
}