document.addEventListener('DOMContentLoaded', () => {
    const gameImagesContainer = document.querySelector('.game-collection .game-images');

    const purchasedGames = JSON.parse(localStorage.getItem('purchasedGames') || '[]');

    purchasedGames.forEach(game => {
      const img = document.createElement('img');
      img.src = game.image || '/Imagenes/placeholder.jpg';
      img.alt = game.title || 'Juego comprado';
      gameImagesContainer.appendChild(img);
    });
  });