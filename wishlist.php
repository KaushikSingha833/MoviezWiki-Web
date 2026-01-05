<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Wishlist - MoviezWiki</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/wishlist.css">
    <link rel="stylesheet" href="css/dialog.css">
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <a href="index.php">MoviesWiki</a>
            </div>

            <button class="hamburger-menu" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav>
                <ul>
                    <li><a href="index.php">Home</a></li>
                    <li><a href="wishlist.php" class="active">My Wishlist</a></li>
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
        </div>
    </header>

    <main>
        <section class="wishlist-section">
            <div class="container">
                <h1>My Wishlist</h1>
                <div id="wishlist-container" class="wishlist-movies">
                    <!-- Wishlist movies will be loaded here -->
                </div>
                <div id="empty-wishlist" class="empty-wishlist">
                    <h2>Your wishlist is empty</h2>
                    <p>Add movies to your wishlist by clicking the heart icon on movie posters.</p>
                    <a href="index.php" class="browse-movies-btn">Browse Movies</a>
                </div>
            </div>
        </section>
    </main>

    <div class="trailer-modal" id="trailer-modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <iframe id="youtube-trailer" width="560" height="315" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

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

    <footer>
        <div class="container">
            <p>&copy; 2024 MoviesWiki. All rights reserved.</p>
        </div>
    </footer>

    <script src="js/script.js"></script>
    <script src="js/wishlist.js"></script>
    <?php include 'ai_summary_modal.php'; ?>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('search-input');
            const searchButton = document.getElementById('search-btn');
            const voiceSearchButton = document.getElementById('voice-search-btn');

            function performSearch() {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `search.php?q=${encodeURIComponent(query)}`;
                }
            }

            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    performSearch();
                }
            });

            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                voiceSearchButton.addEventListener('click', () => {
                    recognition.start();
                });

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    searchInput.value = transcript;
                    performSearch();
                };

                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                };

            }
        });
    </script>
</body>
</html>