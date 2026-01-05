document.addEventListener('DOMContentLoaded', function () {
    const wishlistContainer = document.getElementById('wishlist-container');
    const emptyWishlistMessage = document.getElementById('empty-wishlist');
    const STORAGE_KEY = 'wishlist';

    function getWishlist() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    function saveWishlist(wishlist) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    }

    function renderWishlist() {
        const wishlist = getWishlist();
        wishlistContainer.innerHTML = '';

        if (wishlist.length === 0) {
            emptyWishlistMessage.style.display = 'block';
            wishlistContainer.style.display = 'none';
        } else {
            emptyWishlistMessage.style.display = 'none';
            wishlistContainer.style.display = 'grid';

            wishlist.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.dataset.movie = btoa(JSON.stringify(movie));
                movieCard.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.title}" class="movie-card-poster">
                    <div class="wishlist-icon added-to-wishlist">&#x2764;</div>
                    <div class="movie-card-content">
                        <h3>${movie.title}</h3>
                        <p>${movie.description}</p>
                        <div class="movie-card-actions">
                            <a href="#" class="play-trailer-btn">Play Trailer</a>
                        </div>
                    </div>
                `;
                wishlistContainer.appendChild(movieCard);
            });
        }
    }

    wishlistContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('wishlist-icon')) {
            const movieCard = e.target.closest('.movie-card');
            const movieData = movieCard.dataset.movie;
            if (movieData) {
                const movie = JSON.parse(atob(movieData));
                let wishlist = getWishlist();
                wishlist = wishlist.filter(item => item.title !== movie.title);
                saveWishlist(wishlist);
                renderWishlist();
            }
        }
    });

    renderWishlist();
});
