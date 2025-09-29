const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const notification = document.getElementById('notification');


let cart = JSON.parse(sessionStorage.getItem('cart')) || [];


function updateCart() {
    
    cartItemsContainer.innerHTML = '';
    
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>';
        cartTotalElement.textContent = 'Total: R$ 0,00';
        sessionStorage.setItem('cart', JSON.stringify(cart));
        return;
    }
    
   
    let total = 0;
    
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2)}</p>
                </div>
            </div>
            <button class="remove-from-cart" data-id="${item.id}">Remover</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });
   
    cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    
   
    sessionStorage.setItem('cart', JSON.stringify(cart));
    
    
    document.querySelectorAll('.remove-from-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            removeFromCart(id);
        });
    });
}


function addToCart(id, name, price, image) {
    
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        showNotification('Item já está no carrinho!');
        return;
    }
    
    
    cart.push({
        id,
        name,
        price: parseFloat(price),
        image: image
    });
    
    
    updateCart();
    showNotification('Item adicionado ao carrinho!');
}


function removeFromCart(id) {
    
    cart = cart.filter(item => item.id !== id);
    
    
    updateCart();
    showNotification('Item removido do carrinho!');
}


addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const price = e.target.getAttribute('data-price');
        
        const productElement = e.target.closest('.product');
        const image = productElement.querySelector('img').src;
        
        addToCart(id, name, price, image);
    });
});


function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}


updateCart();