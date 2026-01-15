<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/KaushikSingha833/MoviezWiki">
    <img src="https://cdn-icons-png.flaticon.com/512/2503/2503508.png" alt="MoviezWiki Logo" width="100" height="100">
  </a>

  <h1 align="center">MoviezWiki</h1>

  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com/?lines=The+Next-Gen+Movie+Database;AI-Powered+Insights;PHP+%26+MySQL+Architecture;Secure+User+Management&font=Fira+Code&center=true&width=500&height=30&color=336699&vCenter=true&pause=1000" alt="Typing Animation" />
  </a>

  <p align="center">
    A feature-rich web application bridging traditional movie searching with modern generative AI.
    <br />
    <br />
    <a href="https://github.com/KaushikSingha833/MoviezWiki"><strong>Explore the docs »</strong></a>
    ·
    <a href="https://github.com/KaushikSingha833/MoviezWiki/issues">Report Bug</a>
    ·
    <a href="https://github.com/KaushikSingha833/MoviezWiki/issues">Request Feature</a>
  </p>
</div>

<div align="center">

  ![GitHub repo size](https://img.shields.io/github/repo-size/KaushikSingha833/MoviezWiki?style=for-the-badge&logo=github&color=23ab4c)
  ![GitHub stars](https://img.shields.io/github/stars/KaushikSingha833/MoviezWiki?style=for-the-badge&logo=github&color=e3b341)
  ![GitHub license](https://img.shields.io/github/license/KaushikSingha833/MoviezWiki?style=for-the-badge&color=007ec6)
  ![GitHub last commit](https://img.shields.io/github/last-commit/KaushikSingha833/MoviezWiki?style=for-the-badge&logo=github&color=db4b4b)

</div>

---

<details>
  <summary><strong>Table of Contents (Click to Expand)</strong></summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#project-architecture">Project Architecture</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#gallery--demos">Gallery & Demos</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## 🚀 About The Project

**MoviezWiki** is more than just a movie search tool; it's an intelligent cinematic companion. It upgrades the traditional PHP/MySQL database experience by integrating cutting-edge Large Language Models (LLMs).

Users can manage secure profiles, curate personal wishlists, and critically, get instant, context-aware summaries of films powered by AI, rather than relying on static generic descriptions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ✨ Key Features

* **🎬 Dynamic Search Engine:** Instant access to a vast database of movies and TV shows with real-time filtering.
* **🤖 GenAI Integration:** Utilizing **Gemini, Mistral, and OpenAI** via proxied API calls to generate intelligent, on-demand content summaries.
* **🔐 Secure Authentication:** Production-grade user lifecycle: registration, secure login, session handling, and bcrypt password hashing.
* **📧 Account Recovery:** A complete "Forgot Password" flow using secure email verification tokens.
* **❤️ Interactive Wishlist:** AJAX-powered wishlist management allowing users to save favorites instantaneously without page reloads.
* **🌍 Geo-Specific Content:** Dedicated browsing sections filtered by country and region.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🛠️ Tech Stack

This project is built on a robust LAMP stack foundation, modernized with asynchronous JS and AI API integrations.

| Component | Technologies |
| :--- | :--- |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |
| **Backend** | ![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) |
| **Server** | ![Apache](https://img.shields.io/badge/Apache-D22128?style=flat&logo=apache&logoColor=white) |
| **AI Models** | ![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=flat&logo=googlebard&logoColor=white) ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white) |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📂 Project Architecture

We follow a clean structure separating public assets, configuration, and core logic.

```text
MoviezWiki/
├── api/                  # Server-side AI API Proxy handlers
├── assets/
│   ├── css/              # Stylesheets
│   └── js/               # Interactive client-side scripts (AJAX)
├── config/
│   └── config.php        # Database credentials & global settings
├── IMDB_Project/
│   └── images/           # Application assets & readme media
├── includes/             # Reusable PHP components (Header, Nav, Footer)
├── database_setup.sql    # MySQL schema import file
├── index.php             # Main application entry point
└── README.md
