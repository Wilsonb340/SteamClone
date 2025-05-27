// catalogocart.js

function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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

// Para botones estáticos, si tienes alguno en catálogo
function initAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', e => {
      e.stopPropagation();

      const gameItem = button.closest('.game-item');
      if (!gameItem) return;

      const titleEl = gameItem.querySelector('h3');
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

document.addEventListener('DOMContentLoaded', () => {
  initAddToCartButtons();
});
