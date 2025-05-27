document.addEventListener('DOMContentLoaded', () => {
    const purchasedGamesContainer = document.getElementById('purchased-games');
    if (!purchasedGamesContainer) return; // Por si no existe el contenedor

    // Obtener juegos comprados de localStorage o array vacío
    const purchasedGames = JSON.parse(localStorage.getItem('purchasedGames') || '[]');

    if (purchasedGames.length === 0) {
      purchasedGamesContainer.innerHTML = '<p>No tienes juegos comprados aún.</p>';
      return;
    }

    // Por cada juego, crear el div con clase game-item y la imagen
    purchasedGames.forEach(game => {
      const gameDiv = document.createElement('div');
      gameDiv.className = 'game-item';

      const img = document.createElement('img');
      img.src = game.image || '/Imagenes/placeholder.jpg';
      img.alt = game.title || 'Juego comprado';

      gameDiv.appendChild(img);
      purchasedGamesContainer.appendChild(gameDiv);
    });
  });