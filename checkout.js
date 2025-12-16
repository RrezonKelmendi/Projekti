
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                shippingMethod: document.getElementById('shippingMethod').value,
                notes: document.getElementById('notes').value
            };
            
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            
            
            let total = cart.reduce((sum, item) => sum + item.price, 0);
            const shippingCost = formData.shippingMethod === 'express' ? 10 : 5;
            total += shippingCost;
            
            
            const order = {
                ...formData,
                items: cart,
                total: total,
                date: new Date().toISOString()
            };
            
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            
            localStorage.removeItem('cart');
            
            alert('Porosia u konfirmua me sukses! Do të kontaktoheni së shpejti.');
            window.location.href = 'home.html';
        });
    }
    
    const shippingMethod = document.getElementById('shippingMethod');
    if (shippingMethod) {
        shippingMethod.addEventListener('change', function() {
            displayCartItems();
        });
    }
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItemsDiv = document.getElementById('cartItems');
    const totalPriceSpan = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        if (cartItemsDiv) {
            cartItemsDiv.innerHTML = '<p>Shporta është e zbrazët. <a href="shop.html">Kthehu te shop</a></p>';
        }
        if (totalPriceSpan) {
            totalPriceSpan.textContent = '0€';
        }
        return;
    }
    
    if (cartItemsDiv) {
        cartItemsDiv.innerHTML = '';
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.price}€</p>
                </div>
                <button onclick="removeItem(${index})" style="background: red; color: white; border: none; padding: 0.5rem; border-radius: 5px; cursor: pointer;">Fshi</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    const shippingMethod = document.getElementById('shippingMethod');
    if (shippingMethod) {
        const shippingCost = shippingMethod.value === 'express' ? 10 : 5;
        total += shippingCost;
    }
    
    if (totalPriceSpan) {
        totalPriceSpan.textContent = total.toFixed(2) + '€';
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}
