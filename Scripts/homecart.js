// homecart.js

// Obtener carrito desde localStorage
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Guardar carrito en localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Añadir juego al carrito con manejo de cantidades
function addToCart(game) {
  const cart = getCart();
  const index = cart.findIndex(item => item.id === game.id);

  if (index !== -1) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
  } else {
    cart.push({ ...game, quantity: 1 });
  }

  saveCart(cart);
  alert(`Se agregó "${game.title}" al carrito.`);
}

// Asignar eventos a los botones .add-to-cart de la página
function initAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', e => {
      e.stopPropagation();

      const gameItem = button.closest('.game-item, .dlc-item, .game-summary');
      if (!gameItem) return;

      const titleEl = gameItem.querySelector('h3') || gameItem.querySelector('h1');
      const imgEl = gameItem.querySelector('img');
      const priceEl = gameItem.querySelector('.price');

      if (!titleEl || !imgEl || !priceEl) return;

      const title = titleEl.textContent.trim();
      const image = imgEl.src;
      const price = parseFloat(priceEl.textContent.replace('$', '').trim()) || 0;
      const id = title.toLowerCase().replace(/\s+/g, '-');

      addToCart({ id, title, image, price });
    });
  });
}

// Iniciar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  initAddToCartButtons();
});

// Si usas módulos ES6, puedes exportarlas así:
// export { addToCart, getCart, saveCart };
