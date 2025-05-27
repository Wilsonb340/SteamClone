// Juegos predefinidos para el buscador rápido
const games = [
  { title: "Elden Ring", image: "/Imagenes/elden.jpg", url: "/Index/game.html?title=Elden%20Ring" },
  { title: "Spider-Man", image: "/Imagenes/spiderman.jpg", url: "/Index/game.html?title=Spider-Man" },
  { title: "God of War", image: "/Imagenes/godofwar.jpg", url: "/Index/game.html?title=God%20of%20War" },
  { title: "The Last of Us", image: "/Imagenes/tlou.jpg", url: "/Index/game.html?title=The%20Last%20of%20Us" }
];

// Función para mostrar sugerencias del buscador
function showSuggestions() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const suggestionsBox = document.getElementById("suggestions");

  suggestionsBox.innerHTML = "";
  if (input.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  const filteredGames = games.filter(game => game.title.toLowerCase().includes(input));
  if (filteredGames.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  filteredGames.forEach(game => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion-item");
    suggestionItem.innerHTML = `
      <img src="${game.image}" alt="${game.title}">
      <span>${game.title}</span>
    `;
    suggestionItem.onclick = () => window.location.href = game.url;
    suggestionsBox.appendChild(suggestionItem);
  });

  suggestionsBox.style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
  const gamesContainer = document.getElementById('games-container'); // 🔥 Usa este id en el HTML
  const apiKey = '34122db7ef724f2f85c89bb20ea94ce7';
  const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=12`;

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

        // Si se hace clic fuera del botón, redirige a game.html con el slug
        gameItem.addEventListener('click', (e) => {
          if (!e.target.classList.contains('add-to-cart')) {
            window.location.href = `/Index/game.html?id=${game.slug}`;
          }
        });

             // Después de insertar el gameItem en el DOM:
        gamesContainer.appendChild(gameItem);

        // Agregar funcionalidad al botón recién creado
        const button = gameItem.querySelector('.add-to-cart');
        button.addEventListener('click', (e) => {
          e.stopPropagation(); // Evita que se redireccione

          const title = game.name;
          const image = game.background_image;
          const price = parseFloat(gameItem.querySelector('.price').textContent.replace('$', ''));
          const id = game.slug;

          addToCart({ id, title, image, price });
        });
      }); // ← cierre del forEach
    }) // ← cierre del segundo then
    .catch(error => console.error("Error al cargar juegos de la API:", error)); // opcional
}); // ← cierre de DOMContentLoaded
