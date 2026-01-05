<?php
session_start();
// Put your TMDB v3 API key here (or leave empty to show fallback message)
$TMDB_API_KEY = 'a4cd6d0a764ed0271ff919d36dd16b67'; // e.g. 'abcd1234...'

$q = isset($_GET['q']) ? trim($_GET['q']) : '';
function esc($s){ return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Search - MoviezWiki</title>
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/home.css">
<link rel="stylesheet" href="css/dialog.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />
<style>
.trailer-modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.8);
}
.trailer-modal-content {
    position: relative;
    margin: 10% auto;
    padding: 20px;
    width: 80%;
    max-width: 800px;
}
.trailer-modal-content iframe {
    width: 100%;
    height: 450px;
}
.close-trailer-modal {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}
</style>
</head>
<body>
<header>
    <div class="container">
        <div class="logo"><a href="index.php">MoviezWiki</a></div>
        <button class="hamburger-menu" aria-label="Toggle navigation"><span></span><span></span><span></span></button>
        <nav>
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="wishlist.php">Wishlist</a></li>
                <li><a href="countries.php">By Country</a></li>
                <?php if (!empty($_SESSION['loggedin']) && $_SESSION['loggedin']===true): ?>
                    <li><span class="username">Welcome, <?= esc($_SESSION['username'] ?? '') ?></span></li>
                    <li><a href="logout.php">Logout</a></li>
                <?php else: ?>
                    <li><a href="login.html">Login</a></li>
                <?php endif; ?>
            </ul>
        </nav>
        <div class="search-bar">
            <input id="search-input" type="text" placeholder="Search for a movie..." value="<?= esc($q) ?>">
            <button id="search-btn" type="button">Search</button>
            <button id="voice-search-btn" type="button" style="background: none; border: none; cursor: pointer; padding: 0 5px; color:#f5c518;"><span class="material-symbols-outlined">mic</span></button>
        </div>
    </div>
</header>

<main style="padding:24px;">
    <div class="container">
        <h1>Search results for "<?= esc($q) ?>"</h1>

<?php
if ($q === '') {
    echo "<p>Type a query in the search box and press Search or Enter.</p>";
} else if (empty($TMDB_API_KEY)) {
    echo "<p style='color:#f5c518;'>No TMDB API key configured on the server. Set \$TMDB_API_KEY in this file to enable live search.</p>";
    echo "<p>Search query: <strong>".esc($q)."</strong></p>";
} else {
    // server-side TMDB search
    $url = "https://api.themoviedb.org/3/search/movie?api_key=" . urlencode($TMDB_API_KEY) . "&language=en-US&query=" . urlencode($q) . "&page=1&include_adult=false";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $resp = curl_exec($ch);
    $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http !== 200 || !$resp) {
        echo "<p>Search failed (TMDB returned HTTP {" . $http . "}). Try again later.</p>";
    } else {
        $data = json_decode($resp, true);
        $results = $data['results'] ?? [];
        if (count($results) === 0) {
            echo "<p>No results found for <strong>".esc($q)."</strong>.</p>";
        } else {
            echo "<div class='movies-grid' style='display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px;margin-top:16px;'>";
            $imgBase = "https://image.tmdb.org/t/p/w300";
            foreach ($results as $m) {
                $title = esc($m['title'] ?? $m['name'] ?? 'Untitled');
                $poster = isset($m['poster_path']) ? $imgBase . $m['poster_path'] : 'https://via.placeholder.com/300x450?text=No+Image';
                $year = isset($m['release_date']) ? esc(substr($m['release_date'],0,4)) : '';
                $trailer_embed_url = '';

                // Fetch trailer
                $video_url = "https://api.themoviedb.org/3/movie/" . $m['id'] . "/videos?api_key=" . urlencode($TMDB_API_KEY);
                $ch_video = curl_init($video_url);
                curl_setopt($ch_video, CURLOPT_RETURNTRANSFER, true);
                $resp_video = curl_exec($ch_video);
                curl_close($ch_video);
                $video_data = json_decode($resp_video, true);

                if (isset($video_data['results']) && !empty($video_data['results'])) {
                    foreach ($video_data['results'] as $video) {
                        if ($video['site'] == 'YouTube' && $video['type'] == 'Trailer') {
                            $trailer_embed_url = "https://www.youtube.com/embed/" . $video['key'];
                            break;
                        }
                    }
                }

                $movie_data = base64_encode(json_encode([
                    'title' => $m['title'] ?? $m['name'] ?? 'Untitled',
                    'poster' => isset($m['poster_path']) ? $imgBase . $m['poster_path'] : 'https://via.placeholder.com/300x450?text=No+Image',
                    'description' => $m['overview'] ?? '',
                    'trailer' => $trailer_embed_url
                ]));

                echo "<div class='movie-card' data-movie='{$movie_data}' style='background:#171717;padding:8px;border-radius:8px;'>";
                echo "<div class='poster-wrapper' style='aspect-ratio:2/3;overflow:hidden;border-radius:6px;'><img src='".esc($poster)."' alt='".esc($title)."' style='width:100%;height:100%;object-fit:cover;'></div>";
                echo "<div class='movie-card-content' style='padding:8px;'><h3 style='margin:0;font-size:0.95rem;'>{$title}</h3><p style='margin:6px 0 0;color:#ccc;font-size:0.85rem;'>{$year}</p>";
                if ($trailer_embed_url) {
                    echo "<a href='#' onclick='openTrailer(\"".esc($trailer_embed_url)."\")' style='margin-top:8px;padding:6px 10px;background-color:#f5c518;color:#000;border:none;border-radius:4px;cursor:pointer;font-size:0.85rem;text-decoration:none;font-weight:bold;'>Watch Trailer</a>";
                }
                echo "<button type='button' class='ai-summary-btn' data-title='{$title}' style='margin-top:8px;padding:6px 10px;background-color:#f5c518;color:#000;border:none;border-radius:4px;cursor:pointer;font-size:0.85rem;'>AI Summary</button>";
                echo "<div class='wishlist-icon'>&#x2764;</div>";
                echo "</div>";
                echo "</div>";
            }
            echo "</div>";
        }
    }
}
?>

    </div>
</main>
<?php include 'ai_summary_modal.php'; ?>

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

<footer style="margin-top:40px;">
    <div class="container">
        <p>&copy; <?= date('Y') ?> MoviezWiki. All rights reserved.</p>
    </div>
</footer>

<div id="trailerModal" class="trailer-modal">
    <div class="trailer-modal-content">
        <span class="close-trailer-modal">&times;</span>
        <iframe id="trailerIframe" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

<script src="js/script.js" defer></script>
<script>
document.addEventListener('DOMContentLoaded', function(){
    const input = document.getElementById('search-input');
    const btn = document.getElementById('search-btn');
    function doSearch(){
        const q = (input.value || '').trim();
        if (!q) return;
        // stay on this page and reload with query param
        window.location.href = 'search.php?q=' + encodeURIComponent(q);
    }
    btn.addEventListener('click', doSearch);
    input.addEventListener('keydown', function(e){ if (e.key === 'Enter') doSearch(); });

    const modal = document.getElementById('trailerModal');
    const iframe = document.getElementById('trailerIframe');
    const closeModal = document.querySelector('.close-trailer-modal');

    window.openTrailer = function(url) {
        event.preventDefault();
        iframe.src = url;
        modal.style.display = 'block';
    }

    closeModal.onclick = function() {
        modal.style.display = 'none';
        iframe.src = '';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            iframe.src = '';
        }
    }

    const voiceSearchButton = document.getElementById('voice-search-btn');
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
            input.value = transcript;
            doSearch();
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };
    }
});
</script>
</body>
</html>