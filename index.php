<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MoviesWiki</title>
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/home.css">
    <link rel="stylesheet" href="css/dialog.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />

</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <a href="index.php">MoviezWiki</a>
            </div>
            <button class="hamburger-menu" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav style="position:sticky;">
                <ul>
                    <li><a href="index.php">Home</a></li>
                    <li><a href="wishlist.php">Wishlist</a></li>
                    <li><a href="countries.php">By Country</a></li>
                    <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>
                        <li><span class="username">Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?></span></li>
                        <li><a href="logout.php">Logout</a></li>
                    <?php else: ?>
                        <li><a href="login.html">Login</a></li>
                    <?php endif; ?>
                </ul>
            </nav>
            <div class="search-bar">
                <input id="search-input" type="text" placeholder="Search for a movie...">
                <button id="search-btn" type="button">Search</button>
                <button id="voice-search-btn" type="button" style="background: none; border: none; cursor: pointer; padding: 0 5px; color:#f5c518;"><span class="material-symbols-outlined">mic</span></button>
            </div>
            <div class="suggestions-container"></div>
        </div>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h1>Welcome to MoviezWiki</h1>
            <p>Your ultimate destination for movies, TV shows, and more.</p>
            <a href="#" class="btn-primary">Explore Movies</a>
        </div>
    </section>

    <section class="video-playlist-section">
        <div class="container">
            <h2>Latest Trailers & Clips</h2>
            <div class="video-playlist-content">
                <div class="video-player-container">
                    <iframe id="main-video-player" width="100%" height="400" src="https://www.youtube.com/embed/mjBym9uKth4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="video-list-container">
                    <ul id="video-list">
                        <li class="video-list-item active" data-video-id="mjBym9uKth4">
                            <img src="images/war 2.jpg" alt="War 2 Poster">
                            <div class="video-info">
                                <h3>War 2 Trailer</h3>
                                <p>Hrithik Roshan, Jr. NTR, Kiara Advani</p>
                            </div>
                        </li>
                        <li class="video-list-item" data-video-id="Ades3pQbeh8">
                            <img src="images/one piece.jpg" alt="One Piece Poster">
                            <div class="video-info">
                                <h3>One Piece Netflix Trailer</h3>
                                <p>Live-action adaptation of the popular manga.</p>
                            </div>
                        </li>
                        <li class="video-list-item" data-video-id="03u4xyj0TH4">
                            <img src="images/wednesday.jpg" alt="Wednesday Season 2 Poster">
                            <div class="video-info">
                                <h3>Wednesday Season 2 Trailer</h3>
                                <p>Return of the Addams Family's dark daughter.</p>
                            </div>
                        </li>
                        <li class="video-list-item" data-video-id="bMgfsdYoEEo">
                            <img src="images/conjuring.jpg" alt="Conjuring The Last Rites Poster">
                            <div class="video-info">
                                <h3>Conjuring The Last Rites Trailer</h3>
                                <p>The final chapter in the Conjuring series.</p>
                            </div>
                        </li>
                        <li class="video-list-item" data-video-id="8yh9BPUBbbQ">
                            <img src="images/wp15474017-f1-movie-wallpapers.jpg" alt="F1 Movie Poster">
                            <div class="video-info">
                                <h3>F1 Movie Trailer</h3>
                                <p>The high-octane, action-packed feature film F1® The Movie, starring Brad Pitt and directed by Joseph Kosinski.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="featured-movie-section">
        <div class="container">
            <h2>Featured Movie</h2>
            <div class="featured-movie-card">
                <img src="images/dune.jpg" alt="Dune" class="featured-movie-poster">
                <div class="featured-movie-details">
                    <h3>Dune</h3>
                    <p class="movie-meta"><span>⭐ 8.0/10</span> | <span>Sci-Fi, Adventure</span> | <span>2021</span></p>
                    <p>Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.</p>
                    <a href="https://www.youtube.com/embed/n9xhJrPXop4" class="play-trailer-btn">Watch Trailer</a>
                </div>
            </div>
        </div>
    </section>

    <section class="celebrities-section">
        <div class="container">
            <h2>Top 10 Celebrities</h2>
            <div class="swiper" id="celebrities-swiper">
                <div class="swiper-wrapper">
                    <!-- Celebrities will be loaded here -->
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <div class="custom-nav-buttons">
                <button class="custom-prev-btn" data-swiper="celebrities-swiper">&larr; Previous</button>
                <button class="custom-next-btn" data-swiper="celebrities-swiper">Next &rarr;</button>
            </div>
        </div>
    </section>

    <section class="movies-section">
        <div class="container">
            <h2>Trending Movies</h2>
            <div class="swiper" id="trending-swiper">
                <div class="swiper-wrapper" id="trending-movies">
                    <!-- Trending movies will be loaded here -->
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <div class="custom-nav-buttons">
                <button class="custom-prev-btn" data-swiper="trending-swiper">&larr; Previous</button>
                <button class="custom-next-btn" data-swiper="trending-swiper">Next &rarr;</button>
            </div>

            <h2>Fan Favorites</h2>
            <div class="swiper" id="fan-favorites-swiper">
                <div class="swiper-wrapper" id="fan-favorites-movies">
                    <!-- Fan favorite movies will be loaded here -->
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <div class="custom-nav-buttons">
                <button class="custom-prev-btn" data-swiper="fan-favorites-swiper">&larr; Previous</button>
                <button class="custom-next-btn" data-swiper="fan-favorites-swiper">Next &rarr;</button>
            </div>

            <h2>Popular Movies</h2>
            <div class="swiper-container" id="popular-interests-swiper">
                <div class="swiper-wrapper" id="popular-interests-movies">
                    <!-- Popular interest movies will be loaded here -->
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <div class="custom-nav-buttons">
                <button class="custom-prev-btn" data-swiper="popular-interests-swiper">&larr; Previous</button>
                <button class="custom-next-btn" data-swiper="popular-interests-swiper">Next &rarr;</button>
            </div>

            <h2>Now Playing</h2>
            <div class="swiper-container" id="in-theaters-swiper">
                <div class="swiper-wrapper" id="in-theaters-movies">
                    <!-- In theater movies will be loaded here -->
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <div class="custom-nav-buttons">
                <button class="custom-prev-btn" data-swiper="in-theaters-swiper">&larr; Previous</button>
                <button class="custom-next-btn" data-swiper="in-theaters-swiper">Next &rarr;</button>
            </div>

            <h2>Box Office</h2>
            <div class="swiper-container" id="box-office-swiper">
                <div class="swiper-wrapper" id="box-office-movies">
                    <!-- Box office movies will be loaded here -->
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <div class="custom-nav-buttons">
                <button class="custom-prev-btn" data-swiper="box-office-swiper">&larr; Previous</button>
                <button class="custom-next-btn" data-swiper="box-office-swiper">Next &rarr;</button>
            </div>
        </div>
    </section>

    <div class="trailer-modal" id="trailer-modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <iframe id="youtube-trailer" width="560" height="315" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <div class="movie-details-modal" id="movie-details-modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <div class="modal-body">
                <!-- Movie details will be populated here -->
            </div>
        </div>
    </div>

    <div class="movie-details-modal" id="movie-details-modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <div class="modal-body">
                <!-- Movie details will be populated here -->
            </div>
        </div>
    </div>

    <footer>
        <div class="container">
            <p>&copy; 2025 MoviesWiki. All rights reserved.</p>
            <div class="footer-links">
                <a href="#">Help</a>
                <a href="#">Site Index</a>
                <a href="#">Box Office Mojo</a>
                <a href="#">MoviezWiki Developer</a>
            </div>
        </div>
    </footer>

    <button class="chatbot-toggler">
        <span class="material-symbols-rounded">mode_comment</span>
        <span class="material-symbols-outlined">close</span>
    </button>
    <div class="chatbot">
        <header>
            <h2>Chatbot</h2>
            <span class="close-btn material-symbols-outlined">close</span>
        </header>
        <ul class="chatbox">
            <li class="chat incoming">
                <span class="material-symbols-outlined">smart_toy</span>
                <p>Hi there 👋<br>How can I help you today?</p>
            </li>
        </ul>
        <div class="chat-input">
            <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
            <span id="send-btn" class="material-symbols-rounded">send</span>
        </div>
    </div>

    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script src="js/script.js"></script>
    <?php include 'ai_summary_modal.php'; ?>
</body>
</html>