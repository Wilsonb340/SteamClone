// Leer carrito de localStorage o iniciar vacío
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar carrito en localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Renderizar items en el carrito
function renderCart() {
  const cartContainer = document.querySelector('.cart');
  // Limpiar items existentes (menos resumen y acciones)
  cartContainer.querySelectorAll('.cart-item').forEach(item => item.remove());

  const cart = getCart();

  // Si está vacío mostrar mensaje
  if (cart.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'Tu carrito está vacío.';
    cartContainer.insertBefore(emptyMsg, cartContainer.querySelector('.cart-summary'));
    updateTotal(0);
    return;
  }

  // Insertar cada producto
  cart.forEach(product => {
    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="cart-info">
          <h3>${product.title}</h3>
          <span class="price">$${product.price.toFixed(2)}</span>
      </div>
      <button class="remove" title="Eliminar del carrito">🗑️</button>
    `;

    // Añadir listener para eliminar item
    div.querySelector('.remove').addEventListener('click', () => {
      removeFromCart(product.id);
    });

    // Insertar antes del resumen para que quede arriba
    cartContainer.insertBefore(div, cartContainer.querySelector('.cart-summary'));
  });

  // Actualizar total
  const total = cart.reduce((acc, p) => acc + p.price, 0);
  updateTotal(total);
}

// Actualizar el total en la interfaz
function updateTotal(amount) {
  const totalPriceSpan = document.querySelector('.total-price');
  totalPriceSpan.textContent = `$${amount.toFixed(2)}`;
}

// Eliminar producto por id
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

// Agregar producto al carrito
function addToCart(product) {
  let cart = getCart();

  // Evitar duplicados por id
  if (!cart.some(item => item.id === product.id)) {
    cart.push(product);
    saveCart(cart);
    renderCart();
    alert(`"${product.title}" agregado al carrito.`);
  } else {
    alert(`"${product.title}" ya está en el carrito.`);
  }
}

// Manejar botones y eventos generales
function setupEventListeners() {
  // Seguir comprando: ir a home
  document.querySelector('.continue').addEventListener('click', () => {
    window.location.href = '/Index/home.html';
  });

  // Comprar (guardando juegos comprados en localStorage)
  document.querySelector('.buy').addEventListener('click', () => {
    const cart = getCart();

    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Recuperar juegos comprados previos (o crear array vacío)
    const purchasedGames = JSON.parse(localStorage.getItem('purchasedGames') || '[]');

    // Agregar los juegos comprados ahora (evitar duplicados por id)
    cart.forEach(game => {
      if (!purchasedGames.some(g => g.id === game.id)) {
        purchasedGames.push(game);
      }
    });

    // Guardar lista actualizada en localStorage
    localStorage.setItem('purchasedGames', JSON.stringify(purchasedGames));

    alert('Gracias por tu compra!');
    localStorage.removeItem('cart');
    renderCart();
  });

  // Comprar como regalo (solo alerta)
  document.querySelector('.gift').addEventListener('click', () => {
    alert('Funcionalidad de regalo en construcción.');
  });

  // Agregar DLCs
  document.querySelectorAll('.recommendations .add-to-cart').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const dlcItem = btn.closest('.dlc-item');
      const title = dlcItem.querySelector('h3').textContent;
      const priceText = dlcItem.querySelector('.price').textContent.replace('$', '');
      const price = parseFloat(priceText);
      const image = dlcItem.querySelector('img').src;
      const id = title.toLowerCase().replace(/\s+/g, '-') + '-dlc-' + i;

      addToCart({ id, title, price, image });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  setupEventListeners();
});
