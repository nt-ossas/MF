let products = [
    { id: 1, name: 'Cuffie 3', price: 27 },
    { id: 2, name: 'Cuffie 2 Pro', price: 30 },
    { id: 3, name: 'Cuffie 4', price: 33 }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayCart();
});

function displayProducts() {
    let productsContainer = document.getElementById('product-list');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        let productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Prezzo: €${product.price} (spedizione rapida inclusa)</p>
            <button onclick="addToCart(${product.id})">Aggiungi al Carrello</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    cart.push(product);
    displayCart();
}

function displayCart() {
    let cartContainer = document.getElementById('cart-list');
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Il carrello è vuoto</p>';
        return;
    }
    cart.forEach(product => {
        let cartDiv = document.createElement('div');
        cartDiv.innerHTML = `<p>${product.name} - €${product.price}</p>`;
        cartContainer.appendChild(cartDiv);
    });
}

function submitOrder() {
    let name = prompt('Inserisci il tuo nome:');
    let surname = prompt('Inserisci il tuo cognome:');
    let orderDetails = {
        name: name,
        surname: surname,
        cart: cart
    };

    fetch('sendEmail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails)
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        cart = [];
        displayCart();
    })
    .catch(error => {
        alert('Errore nell\'invio dell\'ordine.');
        console.error(error);
    });
}