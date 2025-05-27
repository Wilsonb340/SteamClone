document.addEventListener('DOMContentLoaded', () => {
    const gamesList = document.querySelector('.games-list');
    if (!gamesList) return;

    // Obtener juegos comprados (ejemplo: array de objetos con id, title, image)
    const purchasedGames = JSON.parse(localStorage.getItem('purchasedGames') || '[]');

    if (purchasedGames.length === 0) {
      // Si no hay juegos, mantener los estáticos o mostrar mensaje si quieres
      return;
    }

    // Limpiar juegos estáticos (opcional, si quieres reemplazar por los comprados)
    gamesList.innerHTML = '';

    purchasedGames.forEach(game => {
      const gameDiv = document.createElement('div');
      gameDiv.className = 'game-item';
      gameDiv.style.cursor = 'pointer';
      gameDiv.onclick = () => showGame(game.id);

      const img = document.createElement('img');
      img.src = game.image || '/Imagenes/placeholder.jpg';
      img.alt = game.title || 'Juego comprado';

      const span = document.createElement('span');
      span.textContent = game.title || 'Juego comprado';

      gameDiv.appendChild(img);
      gameDiv.appendChild(span);

      gamesList.appendChild(gameDiv);
    });

    // Opcional: mostrar el primer juego de la lista
    if(purchasedGames.length > 0) {
      showGame(purchasedGames[0].id);
    }
  });