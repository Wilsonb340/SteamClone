// ======== Lógica de carrito (igual que en homecart.js) ========
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(game) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === game.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({ ...game, quantity: 1 });
  }

  saveCart(cart);
  alert(`Se agregó "${game.title}" al carrito.`);
}

// ======== Inicializar botón en página de detalle de juego ========
document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtn = document.querySelector('.add-to-cart');
  const titleEl = document.getElementById('game-title');
  const imageEl = document.getElementById('game-image');
  const priceEl = document.getElementById('game-price');

  if (!addToCartBtn || !titleEl || !imageEl || !priceEl) return;

  addToCartBtn.addEventListener('click', () => {
    const title = titleEl.textContent.trim();
    const image = imageEl.src;

    let priceText = priceEl.textContent.replace('Precio no disponible', '').trim();
    priceText = priceText.replace('$', '');
    const price = parseFloat(priceText) || 0;

    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

    addToCart({ id, title, image, price });
  });
});