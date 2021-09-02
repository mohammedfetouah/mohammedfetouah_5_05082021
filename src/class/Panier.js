export default class Panier {
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