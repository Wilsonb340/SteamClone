// catalogo.js

document.addEventListener('DOMContentLoaded', () => {
  const catalogoContainer = document.getElementById('catalogo-container');
  const apiKey = '34122db7ef724f2f85c89bb20ea94ce7';
  const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=20`; // carga 20 juegos

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');

        gameItem.innerHTML = `
          <img src="${game.background_image}" alt="${game.name}">
          <div class="game-info">
            <h3>${game.name}</h3>
            <p class="price">$${(Math.random() * 60 + 10).toFixed(2)}</p>
            <button class="add-to-cart">Agregar al carrito</button>
          </div>
        `;

        // Click fuera del botón redirige a página de detalles
        gameItem.addEventListener('click', (e) => {
          if (!e.target.classList.contains('add-to-cart')) {
            window.location.href = `/Index/game.html?id=${game.slug}`;
          }
        });

        catalogoContainer.appendChild(gameItem);

        // Botón agregar al carrito
        const button = gameItem.querySelector('.add-to-cart');
        button.addEventListener('click', (e) => {
          e.stopPropagation(); // evitar redirección

          const title = game.name;
          const image = game.background_image;
          const price = parseFloat(gameItem.querySelector('.price').textContent.replace('$', ''));
          const id = game.slug;

          addToCart({ id, title, image, price });
        });
      });
    })
    .catch(err => console.error('Error cargando juegos:', err));
});
