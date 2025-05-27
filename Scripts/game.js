document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '34122db7ef724f2f85c89bb20ea94ce7'; // Tu API Key RAWG

  // Función para obtener parámetro "id" de la URL
  function getGameSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '';
  }

  const slug = getGameSlug();
  if (!slug) {
    alert('No se especificó el juego.');
    return;
  }

  const baseUrl = 'https://api.rawg.io/api/games/';
  const gameUrl = `${baseUrl}${slug}?key=${apiKey}`;

  // Referencias a elementos del DOM
  const titleEl = document.getElementById('game-title');
  const imageEl = document.getElementById('game-image');
  const descEl = document.getElementById('game-description');
  const genreEl = document.getElementById('game-genre');
  const devEl = document.getElementById('game-developer');
  const releaseEl = document.getElementById('game-release');
  const priceEl = document.getElementById('game-price');
  const relatedContainer = document.getElementById('related-games-container');

  // Fetch datos del juego
  fetch(gameUrl)
    .then(res => {
      if (!res.ok) throw new Error('Juego no encontrado');
      return res.json();
    })
    .then(data => {
      titleEl.textContent = data.name;
      imageEl.src = data.background_image || '/Imagenes/placeholder.jpg';
      imageEl.alt = data.name;
      descEl.textContent = data.description_raw || 'Sin descripción disponible.';
      genreEl.textContent = data.genres.map(g => g.name).join(', ') || '-';
      devEl.textContent = data.developers.map(d => d.name).join(', ') || '-';
      releaseEl.textContent = data.released || '-';

      // Precio aleatorio para simular (puedes integrar tu propia lógica)
      const randomPrice = (Math.random() * 60 + 10).toFixed(2);
      priceEl.textContent = `$${randomPrice}`;

      // Cargar juegos relacionados
      loadRelatedGames(data.parent_platforms, data.tags);
    })
    .catch(err => {
      titleEl.textContent = 'Juego no encontrado';
      descEl.textContent = '';
      console.error(err);
    });

  function loadRelatedGames(platforms, tags) {
    // Para simplificar: buscaremos juegos similares basados en tags o plataformas
    const tagSlugs = tags.map(t => t.slug).join(',');
    const platformSlugs = platforms ? platforms.map(p => p.platform.slug).join(',') : '';

    // URL para buscar juegos relacionados (filtramos por tags o plataformas)
    let relatedUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=4`;
    if (tagSlugs) {
      relatedUrl += `&tags=${tagSlugs}`;
    } else if (platformSlugs) {
      relatedUrl += `&platforms=${platformSlugs}`;
    }

    fetch(relatedUrl)
      .then(res => res.json())
      .then(data => {
        relatedContainer.innerHTML = '';
        data.results.forEach(game => {
          // No mostrar el mismo juego en relacionados
          if (game.slug === slug) return;

          const card = document.createElement('div');
          card.className = 'suggestion-card';
          card.innerHTML = `
            <img src="${game.background_image || '/Imagenes/placeholder.jpg'}" alt="${game.name}" />
            <p>${game.name}</p>
          `;

          card.addEventListener('click', () => {
            window.location.href = `/Index/game.html?id=${game.slug}`;
          });

          relatedContainer.appendChild(card);
        });
      })
      .catch(() => {
        relatedContainer.innerHTML = '<p>No se encontraron juegos relacionados.</p>';
      });
  }
});
