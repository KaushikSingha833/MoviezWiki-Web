# MoviezWiki-Web
<h1 align="center">IMDB Project Clone</h1>

<p align="center">
  A feature-rich web application for searching movies, managing wishlists, and getting AI-powered summaries.
</p>

<p align="center">
  <br>
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/KaushikSingha833/MoviezWiki?style=for-the-badge&logo=github">
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/KaushikSingha833/MoviezWiki?style=for-the-badge&logo=github">
  <img alt="GitHub license" src="https://img.shields.io/github/license/KaushikSingha833/MoviezWiki?style=for-the-badge">
  <br>
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/KaushikSingha833/MoviezWiki?style=for-the-badge&logo=github">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/KaushikSingha833/MoviezWiki?style=for-the-badge&logo=github">
</p>

![Rainbow Line](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ✨ Features

*   **🎬 Movie & TV Show Search:** Dynamically search a vast database of movies and shows.
*   **👤 User Authentication:** Secure user registration and login system with session management.
*   **🔑 Secure Password Recovery:** "Forgot Password" feature with a secure email-based password reset process.
*   **❤️ Personal Wishlist:** Registered users can add or remove movies from a personalized wishlist.
*   **🤖 AI-Powered Summaries:** Get intelligent movie summaries on demand, powered by various large language models (Gemini, Mistral, OpenAI).
*   **🌍 Browse by Country:** A dedicated section to explore content related to different countries.

![Rainbow Line](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🛠️ Tech Stack

<p align="center">
  <a href="https://www.php.net/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP"></a>
  <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>
  <a href="https://httpd.apache.org/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=apache&logoColor=white" alt="Apache"></a>
</p>

*   **AI Integration:** Proxied API calls to Gemini, Mistral, and OpenAI.
*   **Environment:** Designed for a local server environment like XAMPP, WAMP, or MAMP.

![Rainbow Line](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You need a local server environment that supports PHP and MySQL. The easiest way is to install **[XAMPP](https://www.apachefriends.org/index.html)**.

*   PHP >= 7.4
*   MySQL / MariaDB
*   Apache Web Server

### Installation

1.  **Clone the repository:**
    If you have Git installed, you can clone it. Otherwise, download the project ZIP and extract it.
    ```sh
    git clone https://github.com/KaushikSingha833/MoviezWiki.git
    ```

2.  **Place the project in your web server's root directory:**
    Move the `IMDB_Project` folder into the `htdocs` folder of your XAMPP installation (e.g., `C:/xampp/htdocs/`).

3.  **Set up the database:**
    *   Open `phpMyAdmin` from your XAMPP control panel (usually at `http://localhost/phpmyadmin`).
    *   Create a new, empty database. You can name it `imdb_project`.
    *   Select the new database and go to the **Import** tab.
    *   Click "Choose File" and select the `database_setup.sql` file from the project folder.
    *   Click **Go** at the bottom of the page to create and populate the necessary tables.

4.  **Configure the application:**
    *   Open the `config.php` file in the root of the project folder.
    *   Update the database credentials to match the database you just created. The username is typically `root` with an empty password on a default XAMPP installation.
        ```php
        <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "imdb_project"; 

        $conn = new mysqli($servername, $username, $password, $dbname);
        // ...
        ?>
        ```
    *   **(Optional) Configure AI API Keys:** To use the AI summary feature, open the proxy files in the `/api` directory (e.g., `api/gemini_proxy.php`) and insert your personal API keys where indicated.

5.  **Run the application:**
    *   Make sure your Apache and MySQL services are running in the XAMPP control panel.
    *   Open your web browser and navigate to: **`http://localhost/IMDB_Project/`**

![Rainbow Line](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 📸 Screenshots

*A great README includes screenshots of the application. Feel free to replace these placeholders with your own!*

| Login Page | Home Page |
| :---: | :---: |
| ![Login Page](IMDB_Project\images\LOGIN.png) | ![Home Page](IMDB_Project\images\HOMEPAGE.png) |

| Wishlist | AI Summary Modal |
| :---: | :---: |
| ![Wishlist](IMDB_Project\images\WISHLIST.png) | ![AI Summary](IMDB_Project\images\AI SUMMARY.png) |
