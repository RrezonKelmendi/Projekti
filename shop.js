function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const item = {
        name: productName,
        price: price,
        quantity: 1
    };
    
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${productName} u shtua në shportë!`);
    
    // Optionally redirect to checkout
    if (confirm('Dëshironi të shkoni te shporta?')) {
        window.location.href = 'checkout.html';
    }
}
